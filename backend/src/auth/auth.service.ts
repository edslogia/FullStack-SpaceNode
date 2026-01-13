import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Busca usuario en ambas tablas (Administrador y Operador).
   * Devuelve el usuario y el tipo ('admin' | 'operator') si las credenciales son válidas.
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ user: any; type: 'admin' | 'operator' }> {
    // Buscar primero en administradores
    const admin = await this.prisma.administrator.findUnique({
      where: { username },
    });
    if (admin && admin.isActive) {
      const passwordValid = await bcrypt.compare(password, admin.password);
      if (passwordValid) {
        const { password: _, ...result } = admin;
        return { user: result, type: 'admin' };
      }
    }
    // Buscar en operadores
    const operator = await this.prisma.operator.findUnique({
      where: { username },
    });
    if (operator && operator.isActive) {
      // El campo password debe existir en el modelo Operator
      // Si no existe, lanzar excepción clara
      if (!('password' in operator)) {
        throw new UnauthorizedException(
          'El operador no tiene contraseña configurada',
        );
      }
      const passwordValid = await bcrypt.compare(
        password,
        (operator as any).password,
      );
      if (passwordValid) {
        const { password: _, ...result } = operator;
        return { user: result, type: 'operator' };
      }
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(loginDto: LoginAuthDto) {
    const { user, type } = await this.validateUser(
      loginDto.username,
      loginDto.password,
    );
    const payload = { sub: user.id, username: user.username, role: type };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        hasChangedPassword: user.hasChangedPassword,
        type,
      },
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { username, currentPassword, newPassword, confirmPassword } =
      changePasswordDto;

    // Validar que las contraseñas nuevas coincidan
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas nuevas no coinciden');
    }

    // Validar que la contraseña nueva sea diferente a la actual
    if (currentPassword === newPassword) {
      throw new BadRequestException(
        'La contraseña nueva debe ser diferente a la actual',
      );
    }

    // Validar usuario y contraseña actual
    const { user, type } = await this.validateUser(username, currentPassword);

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let updatedUser;
    if (type === 'admin') {
      updatedUser = await this.prisma.administrator.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          hasChangedPassword: true,
          updatedAt: new Date(),
        },
      });
    } else if (type === 'operator') {
      updatedUser = await this.prisma.operator.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          hasChangedPassword: true,
          updatedAt: new Date(),
        },
      });
    } else {
      throw new BadRequestException('Tipo de usuario no soportado');
    }

    // Generar nuevo token con usuario actualizado
    const payload = {
      sub: updatedUser.id,
      username: updatedUser.username,
      role: type,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        hasChangedPassword: updatedUser.hasChangedPassword,
        type,
      },
      message: 'Contraseña actualizada exitosamente',
    };
  }
}
