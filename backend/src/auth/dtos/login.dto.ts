import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

/**
 * DTO para login de usuario.
 * Valida email y contraseña.
 */
export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
