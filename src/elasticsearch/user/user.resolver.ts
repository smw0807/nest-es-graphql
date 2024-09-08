import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserList } from './models/user.model';
import { UserService } from './user.service';
import { UserListInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);
  constructor(private readonly userService: UserService) {}

  @Query(() => UserList, { description: '사용자 리스트 조회' })
  async userList(@Args('dto') dto: UserListInput): Promise<UserList> {
    this.logger.log('사용자 리스트 조회');
    try {
      const result = await this.userService.getUserList(dto);
      console.log('result : ', result);
    } catch (e) {
      this.logger.error('사용자 리스트 조회 실패', e.message);
      console.error(e);
    }
    return { total: 0, data: [] };
  }
}
