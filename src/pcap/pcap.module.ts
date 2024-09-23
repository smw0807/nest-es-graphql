import { Module } from '@nestjs/common';
import { PcapService } from './pcap.service';

@Module({
  providers: [PcapService],
})
export class PcapModule {}
