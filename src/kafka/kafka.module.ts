import { Module } from '@nestjs/common';
import { ElasticSearchModule } from 'src/elasticsearch/elastic.module';
import { KafkaConsumerService } from './kafka.consumer.service';

@Module({
  imports: [ElasticSearchModule],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
