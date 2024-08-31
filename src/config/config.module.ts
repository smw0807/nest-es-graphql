import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './validation.schema';
import appConfig from './app.config';
import elasticConfig from './elastic.config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig, elasticConfig],
      isGlobal: true,
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
