import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../../prisma/prisma.module';

/**
 * Módulo de gestión de clientes.
 * Importa PrismaModule para acceso a la BD.
 * Exporta ClientsService para uso en otros módulos.
 */
@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
