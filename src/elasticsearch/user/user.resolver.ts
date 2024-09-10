import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserList } from './models/user.model';
import { UserService } from './user.service';
import { UserCreateInput, UserListInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '사용자 index 생성' })
  async createUserIndex(): Promise<boolean> {
    try {
      await this.userService.createIndex();
      return true;
    } catch (e) {
      this.logger.error('사용자 index 생성 실패', e);
      return e;
    }
  }

  @Query(() => UserList, { description: '사용자 리스트 조회' })
  async userList(@Args('dto') dto: UserListInput): Promise<UserList> {
    this.logger.log('사용자 리스트 조회');
    try {
      const result = await this.userService.getUserList(dto);
      return {
        total: result.total,
        data: result.data,
      };
    } catch (e) {
      this.logger.error('사용자 리스트 조회 실패', e);
      console.error(e);
    }
    return { total: 0, data: [] };
  }

  @Mutation(() => Boolean, { description: '사용자 생성' })
  async createUser(@Args('data') data: UserCreateInput): Promise<boolean> {
    try {
      const result = await this.userService.createUser(data);
      return result;
    } catch (e) {
      this.logger.error('사용자 생성 실패', e);
      return e;
    }
  }
}
