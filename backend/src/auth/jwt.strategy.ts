import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(/* Puede inyectar ConfigService si se usa */) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'spacenode-secret',
    });
  }

  async validate(payload: any) {
    // Puede agregar lógica de validación extra aquí
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
