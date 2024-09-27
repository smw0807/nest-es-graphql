import { Injectable, OnModuleInit } from '@nestjs/common';
import * as pcap from 'pcap';
import { PcapPacket } from './types/pcap.type';
import { CommonUtilsService } from 'src/utils/common.utils';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PcapService implements OnModuleInit {
  constructor(
    private readonly commonUtilsService: CommonUtilsService,
    private readonly configService: ConfigService,
  ) {}
  private tcp_tracker = new pcap.TCPTracker();
  private pcap_session = null;
  onModuleInit() {
    const config = this.configService.get('app');
    if (config.APP_ROLE === 'producer') {
      console.log('PcapModule has been initialized.');
      this.startCapture();
    }
  }

  startCapture() {
    this.pcap_session = pcap.createSession('en0');
    this.pcap_session.on('packet', (raw_packet) => {
      const packet: PcapPacket = pcap.decode.packet(raw_packet);
      const data = {
        linkType: packet.link_type,
        dhost: this.commonUtilsService.decToHex(packet.payload.dhost.addr),
        shost: this.commonUtilsService.decToHex(packet.payload.shost.addr),
        ttl: packet.payload.payload.ttl,
        saddr: this.commonUtilsService.formatIP(
          packet.payload.payload.saddr?.addr ?? null,
        ),
        daddr: this.commonUtilsService.formatIP(
          packet.payload.payload.daddr?.addr ?? null,
        ),
        sport: packet.payload.payload.payload?.sport ?? null,
        dport: packet.payload.payload.payload?.dport ?? null,
        hexData: this.commonUtilsService.hexToDec(
          packet.payload.payload.payload?.data ?? null,
        ),
        // stringData: this.commonUtilsService.hexToString(
        //   packet.payload.payload.payload?.data ?? null,
        // ),
        dataLength: packet.payload.payload.payload?.dataLength ?? null,
        createdAt: dayjs().add(9, 'h').toDate(),
      };
      console.log(data);
    });
  }
}
