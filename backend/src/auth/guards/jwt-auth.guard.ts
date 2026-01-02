import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard que protege rutas usando JWT.
 * Valida la presencia y validez del token JWT en el header Authorization.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
