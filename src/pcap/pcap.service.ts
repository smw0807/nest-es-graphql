import { Injectable, OnModuleInit } from '@nestjs/common';
import * as pcap from 'pcap';

@Injectable()
export class PcapService implements OnModuleInit {
  private tcp_tracker = new pcap.TCPTracker();
  private pcap_session = null;
  onModuleInit() {
    console.log('PcapModule has been initialized.');
    this.startCapture();
  }

  startCapture() {
    // const pcapSession = pcap.createSession('', 'tcp');

    // pcapSession.on('packet', (rawPacket) => {
    //   const packet = pcap.decode.packet(rawPacket);
    //   console.log(packet);
    // });
    this.pcap_session = pcap.createSession('', {
      filter: 'ip proto \\tcp',
    });

    this.tcp_tracker.on('session', function (session) {
      console.log(
        'Start of session between ' +
          session.src_name +
          ' and ' +
          session.dst_name,
      );
      session.on('end', function (session) {
        console.log(
          'End of TCP session between ' +
            session.src_name +
            ' and ' +
            session.dst_name,
        );
      });
    });

    this.pcap_session.on('packet', function (raw_packet) {
      const packet = pcap.decode.packet(raw_packet);
      this.tcp_tracker.track_packet(packet);
    });
  }
}
