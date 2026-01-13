import {
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateOperatorDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ArrayNotEmpty()
  customerIds: string[];
}
