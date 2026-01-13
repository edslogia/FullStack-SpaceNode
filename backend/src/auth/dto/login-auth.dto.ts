import { IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
