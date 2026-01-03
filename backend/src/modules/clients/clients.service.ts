import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto, ClientResponseDto } from './dtos';

/**
 * Servicio de gestión de clientes.
 * Operaciones CRUD para clientes (ubicaciones físicas).
 * Solo administradores pueden crear/actualizar/eliminar clientes.
 */
@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo cliente.
   * @param createClientDto - Datos del nuevo cliente
   * @returns Cliente creado
   */
  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    const { name, address, contact } = createClientDto;

    // Validación: El nombre del cliente debe ser único
    const existingClient = await this.prisma.client.findFirst({
      where: { name: name.toLowerCase() },
    });

    if (existingClient) {
      throw new BadRequestException('Ya existe un cliente con ese nombre');
    }

    const client = await this.prisma.client.create({
      data: {
        name,
        address,
        contact: contact || null,
        isActive: true,
      },
    });

    return this.mapToResponseDto(client);
  }

  /**
   * Obtiene todos los clientes activos.
   * @returns Lista de clientes
   */
  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.prisma.client.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });

    return clients.map(client => this.mapToResponseDto(client));
  }

  /**
   * Obtiene todos los clientes, incluyendo inactivos (para admin).
   * @returns Lista completa de clientes
   */
  async findAllIncludingInactive(): Promise<ClientResponseDto[]> {
    const clients = await this.prisma.client.findMany({
      orderBy: { name: 'asc' },
    });

    return clients.map(client => this.mapToResponseDto(client));
  }

  /**
   * Obtiene un cliente por ID.
   * @param id - ID del cliente
   * @returns Cliente encontrado
   */
  async findOne(id: string): Promise<ClientResponseDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return this.mapToResponseDto(client);
  }

  /**
   * Actualiza un cliente existente.
   * @param id - ID del cliente
   * @param updateClientDto - Datos a actualizar
   * @returns Cliente actualizado
   */
  async update(id: string, updateClientDto: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    // Validación: Si se actualiza el nombre, verificar que sea único
    if (updateClientDto.name && updateClientDto.name !== client.name) {
      const existingClient = await this.prisma.client.findFirst({
        where: {
          name: updateClientDto.name.toLowerCase(),
          NOT: { id },
        },
      });

      if (existingClient) {
        throw new BadRequestException('Ya existe otro cliente con ese nombre');
      }
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });

    return this.mapToResponseDto(updatedClient);
  }

  /**
   * Desactiva un cliente (soft delete).
   * @param id - ID del cliente
   * @returns Cliente desactivado
   */
  async deactivate(id: string): Promise<ClientResponseDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    const deactivatedClient = await this.prisma.client.update({
      where: { id },
      data: { isActive: false },
    });

    return this.mapToResponseDto(deactivatedClient);
  }

  /**
   * Reactiva un cliente desactivado.
   * @param id - ID del cliente
   * @returns Cliente reactivado
   */
  async reactivate(id: string): Promise<ClientResponseDto> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    const reactivatedClient = await this.prisma.client.update({
      where: { id },
      data: { isActive: true },
    });

    return this.mapToResponseDto(reactivatedClient);
  }

  /**
   * Mapea un cliente de BD a DTO de respuesta.
   */
  private mapToResponseDto(client: any): ClientResponseDto {
    return {
      id: client.id,
      name: client.name,
      address: client.address,
      contact: client.contact,
      isActive: client.isActive,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
