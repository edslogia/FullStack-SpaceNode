import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOperatorDto } from '../auth/dtos/create-operator.dto';
import * as argon2 from 'argon2';

/**
 * Servicio de usuarios.
 * Operaciones CRUD de usuarios (enfoque: creación de operadores por admin).
 * Incluye soporte para asignación de operadores a clientes.
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo usuario operador.
   * La validación de admin se hace en el Guard del controlador.
   * Soporta asignación a cliente mediante clientId.
   */
  async createOperator(createOperatorDto: CreateOperatorDto) {
    const { email, password, clientId } = createOperatorDto;

    // Validar email único
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    // Si se proporciona clientId, validar que existe
    if (clientId) {
      const clientExists = await this.prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!clientExists) {
        throw new BadRequestException('El cliente especificado no existe');
      }
    }

    // Hash de contraseña
    const hashedPassword = await argon2.hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'OPERATOR',
        clientId: clientId || null,
        firstLoginPasswordChange: true,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      clientId: newUser.clientId,
      client: newUser.client,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    };
  }

  /**
   * Obtiene todos los usuarios (solo admin).
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        clientId: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        isActive: true,
        createdAt: true,
      },
    });
  }

  /**
   * Obtiene un usuario por ID.
   */
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        clientId: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        isActive: true,
        createdAt: true,
      },
    });
  }

  /**
   * Obtiene todos los operadores de un cliente específico.
   * Endpoint útil para listar operadores por cliente en el frontend.
   */
  async findByClient(clientId: string) {
    // Validar que el cliente existe
    const clientExists = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new BadRequestException('El cliente especificado no existe');
    }

    return this.prisma.user.findMany({
      where: { clientId },
      select: {
        id: true,
        email: true,
        role: true,
        clientId: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        isActive: true,
        createdAt: true,
      },
    });
  }
}
