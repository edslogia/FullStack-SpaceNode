import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from './entities/operator.entity';

@Injectable()
export class OperatorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOperatorDto: CreateOperatorDto) {
    const { username, password, email, fullName, isActive, customerIds } =
      createOperatorDto;
    // Prohibir username reservado 'admin'
    if (username.trim().toLowerCase() === 'admin') {
      throw new BadRequestException(
        "El username 'admin' está reservado y no puede ser utilizado.",
      );
    }
    if (
      !username ||
      !password ||
      !email ||
      !fullName ||
      typeof isActive !== 'boolean' ||
      !customerIds ||
      customerIds.length === 0
    ) {
      throw new BadRequestException(
        'Todos los campos son obligatorios, incluyendo customerIds.',
      );
    }
    // Validar que el username no exista
    const existingOperator = await this.prisma.operator.findUnique({
      where: { username },
    });
    if (existingOperator) {
      throw new ConflictException(
        `El username '${username}' ya existe. Por favor, elija otro nombre de usuario.`,
      );
    }
    // Validar que el email no exista
    const existingEmail = await this.prisma.operator.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException(
        `El email '${email}' ya está registrado. Por favor, utilice otro correo electrónico.`,
      );
    }
    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Transacción: crear operador y relaciones
    const operator = await this.prisma.$transaction(async (tx) => {
      const op = await tx.operator.create({
        data: {
          username,
          password: hashedPassword,
          email,
          fullName,
          isActive,
        },
      });
      await Promise.all(
        customerIds.map((customerId) =>
          tx.operatorCustomer.create({
            data: {
              operatorId: op.id,
              customerId,
            },
          }),
        ),
      );
      return op;
    });
    // Consultar y retornar el operador con los customers asignados, sin password
    const opWithCustomers = await this.prisma.operator.findUnique({
      where: { id: operator.id },
      include: {
        customers: {
          include: {
            customer: true,
          },
        },
      },
    });
    if (opWithCustomers) {
      const { password, ...data } = opWithCustomers;
      return data;
    }
    return null;
  }

  async findAll() {
    const operators = await this.prisma.operator.findMany({
      include: {
        customers: true,
      },
    });
    return operators.map(({ password, ...operator }) => operator);
  }

  async findOne(id: string) {
    const operator = await this.prisma.operator.findUnique({
      where: { id: String(id) },
      include: { customers: true },
    });
    if (!operator) {
      throw new NotFoundException('Operador no encontrado');
    }
    const { password, ...data } = operator;
    return data;
  }

  /**
   * Actualiza un operador por id. Maneja actualización de datos básicos y relaciones con customers.
   * Lanza NotFoundException si no existe.
   * Retorna mensaje y datos actualizados.
   */
  async update(
    id: string,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<{ message: string; data: Omit<Operator, 'password'> }> {
    const operatorId = String(id);
    // Verificar existencia
    const exists = await this.prisma.operator.findUnique({
      where: { id: operatorId },
    });
    if (!exists) {
      throw new NotFoundException('Operador no encontrado');
    }
    // Separar customerIds y password si existen
    const { customerIds, password, ...rest } = updateOperatorDto as any;
    let updateData = { ...rest };
    // Si se provee password, encriptar
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }
    // Transacción: actualizar datos y relaciones
    await this.prisma.$transaction(async (tx) => {
      // Actualizar datos básicos
      await tx.operator.update({
        where: { id: operatorId },
        data: updateData,
      });
      // Si se proveen customerIds, actualizar relaciones
      if (customerIds && Array.isArray(customerIds)) {
        await tx.operatorCustomer.deleteMany({ where: { operatorId } });
        await Promise.all(
          customerIds.map((customerId: string) =>
            tx.operatorCustomer.create({
              data: { operatorId, customerId },
            }),
          ),
        );
      }
    });
    // Consultar operador actualizado con customers
    const opWithCustomers = await this.prisma.operator.findUnique({
      where: { id: operatorId },
      include: {
        customers: {
          include: { customer: true },
        },
      },
    });
    if (!opWithCustomers) {
      throw new NotFoundException('Operador no encontrado tras actualización');
    }
    const { password: _, ...data } = opWithCustomers;
    return {
      message: 'Operador actualizado exitosamente',
      data,
    };
  }

  async remove(
    id: string,
  ): Promise<{ message: string; data: Omit<Operator, 'password'> }> {
    const operatorId = String(id);
    // Verificar existencia
    const exists = await this.prisma.operator.findUnique({
      where: { id: operatorId },
    });
    if (!exists) {
      throw new NotFoundException('Operador no encontrado');
    }
    // Transacción: eliminar relaciones y luego el operador
    const deleted = await this.prisma.$transaction(async (tx) => {
      await tx.operatorCustomer.deleteMany({ where: { operatorId } });
      return await tx.operator.delete({ where: { id: operatorId } });
    });
    // Omitir password en la respuesta
    const { password: _, ...data } = deleted;
    return {
      message: 'Operador eliminado exitosamente',
      data,
    };
  }
}
