
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

/**
 * Controlador REST para gestión de customers.
 * Prefijo: /api/v1/customer
 */
@Controller('api/v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Crea un nuevo customer
   */
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<{ message: string; data: Customer }> {
    return this.customerService.create(createCustomerDto);
  }

  /**
   * Retorna todos los customers
   */
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  /**
   * Retorna un customer por id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  /**
   * Actualiza un customer por id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<{ message: string; data: Customer }> {
    return this.customerService.update(id, updateCustomerDto);
  }

  /**
   * Elimina un customer por id
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string; data: Customer }> {
    return this.customerService.remove(id);
  }
}
