import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

/**
 * DTO para crear un nuevo usuario operador.
 * Solo el admin puede usar este DTO (validado por AdminRoleGuard).
 * 
 * Si el operador es asignado a un cliente, clientId debe estar presente.
 * Si clientId no se proporciona, se crea un operador sin cliente asignado.
 */
export class CreateOperatorDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @IsUUID('4', { message: 'El clientId debe ser un UUID válido' })
  @IsOptional({ message: 'El clientId es opcional' })
  clientId?: string;
}
