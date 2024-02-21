import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync } from 'crypto';
import { RegisterUserDto } from 'src/users/dtos/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = scryptSync(pass, salt, 32) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new Error('Incorrect password');
    }
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  generateRandomPassword(length: number) {
    return randomBytes(length).toString('hex');
  }
  
  async register(user: RegisterUserDto): Promise<{ access_token: string }> {
    const salt = this.generateRandomPassword(8);
    const hash = scryptSync(user.password, salt, 32) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;
    const newUser = await this.usersService.create({
      ...user,
      password: result,
    });
    return {
      access_token: await this.jwtService.signAsync(newUser),
    };
  }
}
