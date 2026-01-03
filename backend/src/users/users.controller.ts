import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateOperatorDto } from '../auth/dtos/create-operator.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

/**
 * Controlador de usuarios.
 * Endpoints: crear operadores (admin), listar usuarios (admin), obtener usuario, listar por cliente.
 */
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /api/v1/users
   * Crea un nuevo usuario operador (solo admin).
   * Protegido con JWT y AdminRoleGuard.
   * Soporta asignación a cliente mediante clientId en el body.
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  async createOperator(@Body() createOperatorDto: CreateOperatorDto) {
    return this.usersService.createOperator(createOperatorDto);
  }

  /**
   * GET /api/v1/users
   * Lista todos los usuarios (solo admin).
   * Puede filtrar por cliente usando query param: ?clientId=<id>
   * Protegido con JWT y AdminRoleGuard.
   */
  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findAll(@Query('clientId') clientId?: string) {
    if (clientId) {
      return this.usersService.findByClient(clientId);
    }
    return this.usersService.findAll();
  }

  /**
   * GET /api/v1/users/:id
   * Obtiene un usuario específico por ID (solo admin).
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
