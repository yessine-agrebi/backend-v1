import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TutorsModule } from 'src/tutors/tutors.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { RefreshJWTGuard } from './guards/refresh.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
         expiresIn: process.env.JWT_EXPIRATION, 
        },
    }),
    UsersModule,
    TutorsModule,
    CloudinaryModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RefreshJWTGuard
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
