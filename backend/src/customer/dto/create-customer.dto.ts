
import { IsString, IsBoolean, IsOptional, Length, Matches } from 'class-validator';

export class CreateCustomerDto {
	@IsString()
	@Length(3, 32, { message: 'El username debe tener entre 3 y 32 caracteres.' })
	@Matches(/^[a-zA-Z0-9_\-]+$/, { message: 'El username solo puede contener letras, números, guiones y guiones bajos.' })
	username: string;

	@IsString()
	@Length(3, 64, { message: 'El nombre completo debe tener entre 3 y 64 caracteres.' })
	fullName: string;

	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}
