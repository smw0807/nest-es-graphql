import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './validation.schema';
import appConfig from './app.config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
