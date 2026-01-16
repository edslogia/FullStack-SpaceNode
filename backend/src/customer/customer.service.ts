import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo customer. Lanza ConflictException si el username ya existe.
   */
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<{ message: string; data: Customer }> {
    // Verificar unicidad de username
    const exists = await this.prisma.customer.findUnique({
      where: { username: createCustomerDto.username },
    });
    if (exists) {
      throw new ConflictException('El username ya está registrado');
    }
    const customer = await this.prisma.customer.create({
      data: createCustomerDto,
    });
    return {
      message: 'Customer creado exitosamente',
      data: customer,
    };
  }

  /**
   * Retorna todos los customers.
   */
  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      include: {
        nodos: true,
        operators: true,
      },
    });
    // Transformar para solo enviar conteo de nodos y operadores
    return customers.map((c) => ({
      id: c.id,
      username: c.username,
      fullName: c.fullName,
      isActive: c.isActive,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      nodosCount: c.nodos.length,
      operatorsCount: c.operators.length,
    }));
  }

  /**
   * Busca un customer por id. Lanza NotFoundException si no existe.
   */
  async findOne(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        nodos: true,
        operators: { include: { operator: true } },
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer no encontrado');
    }
    return customer;
  }

  /**
   * Actualiza un customer por id. Lanza NotFoundException si no existe.
   */
  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<{ message: string; data: Customer }> {
    // Verificar existencia
    await this.findOne(id);
    const customer = await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
    return {
      message: 'Customer actualizado exitosamente',
      data: customer,
    };
  }

  /**
   * Elimina un customer por id. Lanza NotFoundException si no existe.
   */
  async remove(id: string): Promise<{ message: string; data: Customer }> {
    // Verificar existencia
    await this.findOne(id);
    const customer = await this.prisma.customer.delete({ where: { id } });
    return {
      message: 'Customer eliminado exitosamente',
      data: customer,
    };
  }
}
