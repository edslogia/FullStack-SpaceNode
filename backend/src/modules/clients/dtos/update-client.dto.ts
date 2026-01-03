import { IsString, IsOptional, IsBoolean } from 'class-validator';

/**
 * DTO para actualizar un cliente existente.
 * Todos los campos son opcionales.
 */
export class UpdateClientDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'La dirección debe ser un texto' })
  @IsOptional()
  address?: string;

  @IsString({ message: 'El contacto debe ser un texto' })
  @IsOptional()
  contact?: string;

  @IsBoolean({ message: 'isActive debe ser booleano' })
  @IsOptional()
  isActive?: boolean;
}
