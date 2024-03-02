import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from '../roles';

export class RegisterUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: Role;
  @IsString()
  @IsOptional()
  phone: string;
  @IsString()
  @IsOptional()
  profilePicture: string;
}
