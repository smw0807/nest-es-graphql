import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(winstonLogger);
  await app.listen(5005);
}
bootstrap();
