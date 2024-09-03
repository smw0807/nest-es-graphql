import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule as esModule } from '@nestjs/elasticsearch';
import { ElasticSearchService } from './elastic.service';
import { ElasticIndexService } from './elastic.index.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    esModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('elastic');
        const configHosts = config.ES_HOSTS;
        let hosts: string | string[] = '';
        // configHosts 값에 , 가 포함되어 있으면 배열로 변환
        if (configHosts.includes(',')) {
          hosts = configHosts.split(',');
        } else {
          hosts = configHosts;
        }
        return {
          node: hosts,
          maxResponseSize: config.ES_MAX_RESPONSE_SIZE,
          requestTimeout: config.ES_REQUEST_TIMEOUT,
          pingTimeout: config.ES_PING_TIMEOUT,
          sniffOnStart: true,
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            username: config.ES_USERNAME,
            password: config.ES_PASSWORD,
          },
        };
      },
    }),
  ],
  providers: [ElasticSearchService, ElasticIndexService],
})
export class ElasticSearchModule {}
