import { Module } from '@nestjs/common';
import { ElasticsearchModule as esModule } from '@codemask-labs/nestjs-elasticsearch';
import { healthCheckService } from './health.check.service';
import { ConfigModule } from '@nestjs/config';
import { UserDocument } from './index/User';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UtilsModule } from 'src/utils/utils.module';
@Module({
  imports: [
    ConfigModule,
    UtilsModule,
    esModule.register({
      node: process.env.ES_HOSTS,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD,
      },
    }),
    esModule.forFeature([UserDocument]),
  ],
  providers: [healthCheckService, UserService, UserResolver],
})
export class ElasticSearchModule {}
/*
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
        // maxResponseSize: config.ES_MAX_RESPONSE_SIZE,
        // requestTimeout: config.ES_REQUEST_TIMEOUT,
        // pingTimeout: config.ES_PING_TIMEOUT,
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
*/
