import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/users/dtos/signIn.dto';
import { User } from 'src/users/entities/user.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('profilePicture'))
  async register(@Body() user: User | Tutor, @UploadedFile() profilePicture: Express.Multer.File) {
    const response = await this.authService.register(user, profilePicture);
    console.log(response);
    return response;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
