import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '사용자 리스트 조회' })
export class UserListInput {
  @Field(() => Int, { description: '조회 개수' })
  size: number;
  @Field(() => [Float], { nullable: true, description: '다음 검색 기준' })
  search_after?: number[];
}

@InputType({ description: '사용자 생성' })
export class UserCreateInput {
  @Field(() => String, { description: '사용자 아이디' })
  user_id: string;
  @Field(() => String, { description: '사용자 이름' })
  name: string;
  @Field(() => String, { description: '사용자 이메일' })
  email: string;
  @Field(() => String, { description: '사용자 비밀번호' })
  password: string;
}
