import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticIndexService implements OnModuleInit {
  private readonly logger = new Logger(ElasticIndexService.name);
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    const check = await this.checkIndexVersion();

    // 인덱스가 없을 경우 인덱스 생성 및 초기 버전 추가
    if (!check) {
      this.logger.log('### Index version not exists');
      await this.makeIndexVersion();
      this.logger.log('### Index version created');
      await this.addIndexVersion('0.0');
      this.logger.log('### Index version added');
    }
    await this.compareIndexVersion();
  }

  // 인덱스 버전 확인
  async checkIndexVersion(): Promise<boolean> {
    try {
      // 인덱스 번전 인덱스 존재 여부 확인
      const result = await this.esService.indices.exists({
        index: 'index_version',
      });
      this.logger.log(`Index version exists: ${result}`);
      return result;
    } catch (e) {
      this.logger.error('Index version check failed', e.message);
    }
  }

  // 인덱스 버전 비교
  async compareIndexVersion() {
    try {
      // 현재 버전 확인
      const version = this.configService.get('elastic.ES_INDEX_VER');
      // 현재 버전과 인덱스 버전 비교
      const versionSource = await this.esService.search({
        index: 'index_version',
        body: {
          query: {
            match_all: {},
          },
        },
      });

      if (versionSource.hits.hits.length === 0) {
        // 인덱스 버전 인덱스는 있고 데이터가 없을 경우 현재 버전 추가
        await this.addIndexVersion(version);
      } else {
        // 인덱스 버전 비교
        const indexVersion = versionSource.hits.hits[0]._source['version'];
        if (indexVersion !== version) {
          this.logger.error('### Index version mismatch');
        } else {
          this.logger.log('### Index version matched');
        }
      }
    } catch (e) {
      this.logger.error('Index version compare failed', e.message);
      console.error(e);
    }
  }

  // 인덱스 버전 인덱스 추가
  async makeIndexVersion() {
    try {
      const result = await this.esService.indices.create({
        index: 'index_version',
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
          refresh_interval: '1ms',
        },
        body: {
          mappings: {
            properties: {
              version: {
                type: 'keyword',
              },
            },
          },
        },
      });
      this.logger.log(result, 'Index version created: ');
    } catch (e) {
      this.logger.error('Index version create failed', e.message);
      console.error(e);
    }
  }

  // 인덱스 버전 추가
  async addIndexVersion(version: string) {
    try {
      const result = await this.esService.index({
        index: 'index_version',
        body: {
          version,
        },
      });
      this.logger.log(result, 'Index version added: ');
    } catch (e) {
      this.logger.error('Index version add failed', e.message);
      console.error(e);
    }
  }
}
