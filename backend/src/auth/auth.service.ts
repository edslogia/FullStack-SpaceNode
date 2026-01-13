import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
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
      },
    };
  }
}
