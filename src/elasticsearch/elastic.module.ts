import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule as esModule } from '@nestjs/elasticsearch';
import { ConfigModule } from 'src/config/config.module';
import { ElasticSearchService } from './elastic.service';

@Module({
  imports: [
    esModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const configHosts = configService.get<string>('elastic.ES_HOSTS');
        let hosts: string | string[] = '';
        // configHosts 값에 , 가 포함되어 있으면 배열로 변환
        if (configHosts.includes(',')) {
          hosts = configHosts.split(',');
        } else {
          hosts = configHosts;
        }
        return {
          node: hosts,
          maxResponseSize: configService.get<number>(
            'elastic.ES_MAX_RESPONSE_SIZE',
          ),
          requestTimeout: configService.get<number>(
            'elastic.ES_REQUEST_TIMEOUT',
          ),
          pingTimeout: configService.get<number>('elastic.ES_PING_TIMEOUT'),
          sniffOnStart: true,
          auth: {
            username: configService.get<string>('elastic.ES_USER'),
            password: configService.get<string>('elastic.ES_PASSWORD'),
          },
        };
      },
    }),
  ],
  providers: [ElasticSearchService],
})
export class ElasticSearchModule {}
