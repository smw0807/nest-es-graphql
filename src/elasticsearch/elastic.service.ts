import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@codemask-labs/nestjs-elasticsearch';

@Injectable()
export class ElasticSearchService implements OnModuleInit {
  private readonly logger = new Logger(ElasticSearchService.name);
  constructor(private readonly esService: ElasticsearchService) {}

  // 초기화 시 Elasticsearch 클러스터의 상태를 확인
  async onModuleInit() {
    await this.healthCheck();
  }
  // 연결된 Elasticsearch 클러스터의 상태를 확인
  async healthCheck() {
    try {
      const health = await this.esService.getClusterHealth();
      this.logger.log('### Elasticsearch health check S###');
      const keys = Object.keys(health);
      keys.forEach((key) => {
        this.logger.log(`${key}: ${health[key]}`);
      });
      this.logger.log('### Elasticsearch health check E###');
    } catch (e) {
      this.logger.error('Elasticsearch health check failed', e.message);
      console.error(e);
    }
  }
}
