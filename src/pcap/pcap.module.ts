import { Module } from '@nestjs/common';
import { PcapService } from './pcap.service';
import { UtilsModule } from 'src/utils/utils.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [UtilsModule, ConfigModule],
  providers: [PcapService],
})
export class PcapModule {}
