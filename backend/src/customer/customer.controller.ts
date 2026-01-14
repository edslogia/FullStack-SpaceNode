import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

/**
 * Controlador REST para gestión de customers.
 */
@Controller('api/v1/customer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Crea un nuevo customer
   */
  @Post()
  @Roles('admin')
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<{ message: string; data: Customer }> {
    return this.customerService.create(createCustomerDto);
  }

  /**
   * Retorna todos los customers
   */
  @Get()
  @Roles('admin')
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  /**
   * Retorna un customer por id
   */
  @Get(':id')
  @Roles('admin', 'operator')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  /**
   * Actualiza un customer por id
   */
  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<{ message: string; data: Customer }> {
    return this.customerService.update(id, updateCustomerDto);
  }

  /**
   * Elimina un customer por id
   */
  @Delete(':id')
  @Roles('admin')
  remove(
    @Param('id') id: string,
  ): Promise<{ message: string; data: Customer }> {
    return this.customerService.remove(id);
  }
}
