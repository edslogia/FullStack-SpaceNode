import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOperatorDto } from '../auth/dtos/create-operator.dto';
import * as argon2 from 'argon2';

/**
 * Servicio de usuarios.
 * Operaciones CRUD de usuarios (enfoque: creación de operadores por admin).
 */
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo usuario operador.
   * La validación de admin se hace en el Guard del controlador.
   */
  async createOperator(createOperatorDto: CreateOperatorDto) {
    const { email, password } = createOperatorDto;

    // Validar email único
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hash de contraseña
    const hashedPassword = await argon2.hash(password);

    const newUser = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'OPERATOR',
        firstLoginPasswordChange: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
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
        isActive: true,
        createdAt: true,
      },
    });
  }
}
