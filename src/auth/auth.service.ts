import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async signIn(email: string, pass: string): Promise<{access_token: string}> {
        const user = await this.usersService.findOne(email);
        if(user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = {userId: user.userId, email: user.email};
        console.log('payload', payload);
        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }
}
