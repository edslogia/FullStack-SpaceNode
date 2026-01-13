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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.administrator.findUnique({
      where: { username },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // No exponer password
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = { sub: user.id, username: user.username, role: 'admin' };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        hasChangedPassword: user.hasChangedPassword,
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
    const user = await this.validateUser(username, currentPassword);

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña y marcar como cambiada
    const updatedUser = await this.prisma.administrator.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        hasChangedPassword: true,
        updatedAt: new Date(),
      },
    });

    // Generar nuevo token con usuario actualizado
    const payload = {
      sub: updatedUser.id,
      username: updatedUser.username,
      role: 'admin',
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        hasChangedPassword: updatedUser.hasChangedPassword,
      },
      message: 'Contraseña actualizada exitosamente',
    };
  }
}
