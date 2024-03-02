import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/users/dtos/signIn.dto';
import { User } from 'src/users/entities/user.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() user: User | Tutor) {
    const response = await this.authService.register(user);
    console.log(response);
    return response;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
