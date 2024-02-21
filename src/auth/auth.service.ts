import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { ...payload } = user;
    console.log('payload', payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: User): Promise<{ access_token: string }> {
    //register with jwt
    const newUser = await this.usersService.create(user);
    const payload = { userId: newUser.userId, email: newUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
