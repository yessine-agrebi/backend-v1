import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/users/dtos/signIn.dto';
import { User } from 'src/users/entities/user.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { RefreshJWTGuard } from './guards/refresh.guard';

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
  @Post('signup')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async register(
    @Body() user: User | Tutor,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    const response = await this.authService.register(user, profilePicture);
    console.log(response);
    return response;
  }
  @Public()
  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
