import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Accept', 'X-Access-Token'],
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS']
    }
  });
  
  app.setGlobalPrefix('api/v1');
  await app.listen(8000);
}
bootstrap();
