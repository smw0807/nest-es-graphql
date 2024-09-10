import {
  ElasticsearchService,
  Index,
  InjectIndex,
  Order,
} from '@codemask-labs/nestjs-elasticsearch';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserDocument } from '../index/User';
import { UserCreateInput, UserListInput } from './inputs/user.input';
import { UserList } from './models/user.model';
import { ApolloError } from 'apollo-server-express';
import { CommonUtilsService } from 'src/utils/common.utils';
import * as dayjs from 'dayjs';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);
  private readonly INDEX_NAME = 'user';

  @InjectIndex(UserDocument)
  private readonly userIndex: Index<UserDocument>;

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly cmnUtilsService: CommonUtilsService,
  ) {}

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
              name: { type: 'keyword' },
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
      this.logger.error('User index creation failed', e);
    }
  }

  // 사용자 리스트 조회
  async getUserList({ size, search_after }: UserListInput): Promise<UserList> {
    const result: UserList = { total: 0, data: [] };
    try {
      /**
       * ?? docuemnt의 _id는 제공되지 않네??
       * ?? search_after는 왜 안되지??
       */
      const { total, documents } = await this.userIndex.search({
        size: size,
        search_after: search_after ? search_after : undefined,
        sort: [
          {
            created_at: {
              order: Order.DESC,
            },
          },
        ],
      });
      result.total = total;
      result.data = documents.map((doc) => ({
        ...doc.source,
        created_at: dayjs(doc.source.created_at).format('YYYY-MM-DD HH:mm:ss'),
        sort: [...doc.sort],
      }));
    } catch (e) {
      this.logger.error('Failed to get user list', e);
    }
    return result;
  }

  // 사용자 생성
  async createUser(data: UserCreateInput): Promise<boolean> {
    try {
      // 아이디 중복 체크
      await this.checkUserId(data.user_id);
      // 이메일 중복 체크
      await this.checkEmail(data.email);

      // 패스워드 암호화
      data.password = this.cmnUtilsService.cryptoPassword(data.password);

      // 사용자 생성
      const result = await this.esService.getBaseService().index({
        index: this.INDEX_NAME,
        body: {
          ...data,
          created_at: new Date(),
        },
      });
      this.logger.log(result, 'User created');
      return true;
    } catch (e) {
      this.logger.error('Failed to create user', e);
      return e;
    }
  }

  // 아이디 중복 체크
  async checkUserId(userId: string): Promise<void> {
    try {
      const { total } = await this.userIndex.search({
        size: 1,
        query: {
          bool: {
            must: [
              {
                term: {
                  user_id: {
                    value: userId,
                  },
                },
              },
            ],
          },
        },
      });
      if (total) {
        throw new ApolloError(
          '이미 사용중인 아이디입니다.',
          'DUPLICATED_USER_ID',
        );
      }
    } catch (e) {
      this.logger.error('Failed to check user id', e);
      throw e;
    }
  }

  // 이메일 중복 체크
  async checkEmail(email: string): Promise<void> {
    try {
      const { total } = await this.userIndex.search({
        size: 1,
        query: {
          bool: {
            must: [
              {
                term: {
                  email: {
                    value: email,
                  },
                },
              },
            ],
          },
        },
      });
      if (total) {
        throw new ApolloError(
          '이미 사용중인 이메일입니다.',
          'DUPLICATED_EMAIL',
        );
      }
    } catch (e) {
      this.logger.error('Failed to check email', e);
      throw e;
    }
  }
}
