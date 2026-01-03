import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto, ClientResponseDto } from './dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../../auth/guards/admin-role.guard';

/**
 * Controlador de clientes (ubicaciones físicas).
 * Endpoints para gestionar clientes (solo admin).
 * Todos los endpoints están protegidos con JWT y AdminRoleGuard.
 */
@Controller('api/v1/clients')
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  /**
   * POST /api/v1/clients
   * Crea un nuevo cliente.
   * Solo admin.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.create(createClientDto);
  }

  /**
   * GET /api/v1/clients
   * Lista todos los clientes activos.
   * Solo admin.
   */
  @Get()
  async findAll(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAll();
  }

  /**
   * GET /api/v1/clients/all
   * Lista todos los clientes incluyendo desactivados.
   * Solo admin.
   */
  @Get('all')
  async findAllIncludingInactive(): Promise<ClientResponseDto[]> {
    return this.clientsService.findAllIncludingInactive();
  }

  /**
   * GET /api/v1/clients/:id
   * Obtiene un cliente por ID.
   * Solo admin.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  /**
   * PUT /api/v1/clients/:id
   * Actualiza un cliente completo.
   * Solo admin.
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.clientsService.update(id, updateClientDto);
  }

  /**
   * PATCH /api/v1/clients/:id/deactivate
   * Desactiva un cliente (soft delete).
   * Solo admin.
   */
  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.deactivate(id);
  }

  /**
   * PATCH /api/v1/clients/:id/reactivate
   * Reactiva un cliente desactivado.
   * Solo admin.
   */
  @Patch(':id/reactivate')
  async reactivate(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.reactivate(id);
  }
}
