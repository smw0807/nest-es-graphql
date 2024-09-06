import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ElasticSearchModule } from './elasticsearch/elastic.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [ConfigModule, ElasticSearchModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
