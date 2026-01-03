import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { CreateOperatorDto } from './dtos/create-operator.dto';

/**
 * Servicio de autenticación y autorización.
 * Maneja login, JWT, cambio de contraseña y creación de usuarios operadores.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Autentica un usuario y retorna JWT + información de usuario.
   * Valida email/contraseña y verifica si requiere cambio de contraseña en primer login.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuario por email (case-insensitive)
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Validar contraseña con Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Generar JWT
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstLoginPasswordChange: user.firstLoginPasswordChange,
      },
    };
  }

  /**
   * Cambia la contraseña del usuario (autenticado) y marca que completó el cambio de contraseña.
   */
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

    // Validaciones básicas
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    if (newPassword.length < 8) {
      throw new BadRequestException('La contraseña debe tener al menos 8 caracteres');
    }

    // Obtener usuario actual
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Validar contraseña actual
    const isCurrentPasswordValid = await argon2.verify(user.password, currentPassword);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    // Hash de nueva contraseña
    const hashedPassword = await argon2.hash(newPassword);

    // Actualizar contraseña y marcar que completó el cambio
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        firstLoginPasswordChange: false,
      },
    });

    return { message: 'Contraseña actualizada correctamente' };
  }

  /**
   * Crea un nuevo usuario operador (solo admin puede crear).
   * El admin debe estar verificado por un Guard en el controlador.
   * Si se proporciona clientId, el operador se asigna a ese cliente.
   */
  async createOperator(createOperatorDto: CreateOperatorDto) {
    const { email, password, clientId } = createOperatorDto;

    // Validar email único
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    if (password.length < 8) {
      throw new BadRequestException('La contraseña debe tener al menos 8 caracteres');
    }

    // Si se proporciona clientId, validar que el cliente existe
    if (clientId) {
      const clientExists = await this.prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!clientExists) {
        throw new BadRequestException('El cliente especificado no existe');
      }
    }

    // Hash de contraseña
    const hashedPassword = await argon2.hash(password);

    // Crear usuario operador
    const newUser = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'OPERATOR',
        clientId: clientId || null, // Asignar cliente si se proporciona
        firstLoginPasswordChange: true, // El operador debe cambiar contraseña en primer login
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      clientId: newUser.clientId,
      client: newUser.client,
      message: 'Operador creado correctamente. Debe cambiar la contraseña en el primer login.',
    };
  }

  /**
   * Valida un JWT y retorna el payload.
   * Usado por estrategia JWT de Passport.
   */
  async validateJwtPayload(payload: { sub: string; email: string; role: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstLoginPasswordChange: user.firstLoginPasswordChange,
    };
  }
}
