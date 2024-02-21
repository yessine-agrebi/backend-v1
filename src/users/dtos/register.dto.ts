import { IsEmail } from 'class-validator';

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  password: string;
}
