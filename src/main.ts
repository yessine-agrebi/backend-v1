import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Access-Token',
      ],
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    },
  });

  app.setGlobalPrefix('api/v1');
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   transform: true,
  //   forbidNonWhitelisted: true,
  // }));
  await app.listen(8000);
}
bootstrap();
