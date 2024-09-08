import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '사용자 리스트 조회' })
export class UserListInput {
  @Field(() => Int, { description: '조회 개수' })
  size: number;
  @Field(() => Int, { nullable: true, description: '다음 검색 기준' })
  search_after?: number;
}
