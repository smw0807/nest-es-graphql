import { Injectable, OnModuleInit } from '@nestjs/common';
import * as pcap from 'pcap';
import { PcapSession } from 'pcap';

@Injectable()
export class PcapService implements OnModuleInit {
  private tcp_tracker = new pcap.TCPTracker();
  private pcap_session: PcapSession = null;
  onModuleInit() {
    console.log('PcapModule has been initialized.');
    this.startCapture();
  }

  startCapture() {
    this.pcap_session = pcap.createSession('en0');
    this.pcap_session.on('packet', (raw_packet) => {
      const packet = pcap.decode.packet(raw_packet);
      console.dir(packet, { depth: null });
    });
  }
}
