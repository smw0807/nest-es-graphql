import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EachMessagePayload, Kafka } from 'kafkajs';
import { PacketService } from 'src/elasticsearch/packet/packet.service';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);
  constructor(private readonly esService: PacketService) {
    console.log('KafkaConsumerService has been initialized.');
  }
  private kafka = new Kafka({
    clientId: 'packet-consumer',
    brokers: ['localhost:9092'],
  });
  private consumer = this.kafka.consumer({ groupId: 'pcap-group' });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'pcap-data', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        this.logger.log('====================');
        this.logger.log(`Topic: ${topic}`);
        this.logger.log(`Partition: ${partition}`);
        this.logger.log(`Offset: ${message.offset}`);
        this.logger.log('====================');

        // console.log({
        //   value: message.value.toString(),
        // });
        //todo esService에 데이터 저장 로직 추가
      },
    });
  }
}
