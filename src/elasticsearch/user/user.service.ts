import {
  ElasticsearchService,
  Index,
  InjectIndex,
  Order,
} from '@codemask-labs/nestjs-elasticsearch';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserDocument } from '../index/User';
import { UserListInput } from './inputs/user.input';
import { UserList } from './models/user.model';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);
  private readonly INDEX_NAME = 'user';

  @InjectIndex(UserDocument)
  private readonly userIndex: Index<UserDocument>;

  constructor(private readonly esService: ElasticsearchService) {}

  async onModuleInit() {
    await this.createIndex();
  }
  // index 없으면 생성
  async createIndex() {
    try {
      const exists = await this.esService.getBaseService().indices.exists({
        index: this.INDEX_NAME,
      });
      if (!exists) {
        this.logger.log('Creating user index');
        await this.esService.getBaseService().indices.create({
          index: this.INDEX_NAME,
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
            refresh_interval: '1ms',
          },
          mappings: {
            properties: {
              user_id: { type: 'keyword' },
              name: { type: 'text' },
              email: { type: 'keyword' },
              password: { type: 'keyword' },
              temp_password: { type: 'keyword' },
              created_at: { type: 'date' },
            },
          },
        });
        this.logger.log('completed user index creation!!!');
      }
    } catch (e) {
      this.logger.error('User index creation failed', e.message);
      console.error(e);
    }
  }

  // 사용자 리스트 조회
  async getUserList({ size, search_after }: UserListInput): Promise<UserList> {
    const result: UserList = { total: 0, data: [] };
    try {
      console.log('size', size);
      console.log('search_after', search_after);
      const { total, documents } = await this.userIndex.search({
        size: 10,
        search_after: [],
        sort: [
          {
            created_at: {
              order: Order.DESC,
            },
          },
        ],
        query: { bool: { must: [] } },
      });
      result.total = total;
      result.data = documents.map((doc) => doc.source);
      console.log('total', total);
      console.log('documents', documents);
    } catch (e) {
      this.logger.error('Failed to get user list', e.message);
      console.error(e);
    }
    return result;
  }
}
