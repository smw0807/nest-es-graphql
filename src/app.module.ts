import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ElasticSearchModule } from './elasticsearch/elastic.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PcapModule } from './pcap/pcap.module';

@Module({
  imports: [
    ConfigModule,
    // APP_RULE이 consumer일 경우에만 ElasticSearchModule을 import
    ...(process.env.APP_ROLE === 'consumer' ? [ElasticSearchModule] : []),
    GraphqlModule,
    PcapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
