import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './logger/winston.logger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(winstonLogger);

  // 환경변수 작업
  const configService = app.get(ConfigService);

  const port = configService.get('app.APP_PORT');
  await app.listen(port);
}
bootstrap();
