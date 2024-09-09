import { Module } from '@nestjs/common';
import { CommonUtilsService } from './common.utils';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [CommonUtilsService],
  exports: [CommonUtilsService],
})
export class UtilsModule {}
