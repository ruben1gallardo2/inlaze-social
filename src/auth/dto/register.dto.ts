import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  fullName: string;
}
