import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Guard que valida si el usuario autenticado tiene rol de ADMIN.
 * Se usa para proteger endpoints que solo el admin puede ejecutar.
 */
@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('Solo administradores pueden acceder a este recurso');
    }

    return true;
  }
}
