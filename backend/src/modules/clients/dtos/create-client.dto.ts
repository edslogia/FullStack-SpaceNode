import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO para crear un nuevo cliente.
 * Solo el admin puede crear clientes.
 */
export class CreateClientDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del cliente es requerido' })
  name: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección es requerida' })
  address: string;

  @IsString({ message: 'El contacto debe ser un texto' })
  @IsOptional()
  contact?: string;
}
