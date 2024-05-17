import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://codearena.jbertrand.fr',
      'https://www.codearena.jbertrand.fr',
    ], // Autoriser uniquement cette origine
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3001);
}
bootstrap();
