import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // ou true pour permettre à tous les domaines
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // autoriser les cookies et les en-têtes d'autorisation
  });
  await app.listen(3001);
}
bootstrap();
