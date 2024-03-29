import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../roles';

export class UserDto {
  @IsNumber()
  userId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  role: Role;

  @IsOptional()
  @IsString()
  profilePicture: string;
}
