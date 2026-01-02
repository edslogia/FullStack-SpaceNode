import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

/**
 * DTO para cambio de contraseña.
 * Validaciones: contraseña actual, nueva y confirmación.
 */
export class ChangePasswordDto {
  @IsString({ message: 'La contraseña actual debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña actual es requerida' })
  currentPassword: string;

  @IsString({ message: 'La nueva contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  newPassword: string;

  @IsString({ message: 'La confirmación debe ser un texto' })
  @MinLength(8, { message: 'La confirmación debe coincidir' })
  @IsNotEmpty({ message: 'La confirmación es requerida' })
  confirmPassword: string;
}
