import { Module } from '@nestjs/common';
import { PcapService } from './pcap.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [PcapService],
})
export class PcapModule {}
