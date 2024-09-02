import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchService {
  private readonly logger = new Logger(ElasticSearchService.name);
  constructor(private readonly esService: ElasticsearchService) {
    this.healthCheck();
  }

  // 연결된 Elasticsearch 클러스터의 상태를 확인합니다.
  async healthCheck() {
    try {
      const health = await this.esService.cluster.health({});
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
