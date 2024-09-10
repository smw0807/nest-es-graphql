import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '사용자 정보' })
export class User {
  @Field(() => String, { description: '사용자 아이디' })
  user_id: string;
  @Field(() => String, { description: '사용자 이름' })
  name: string;
  @Field(() => String, { description: '사용자 이메일' })
  email: string;
  @Field(() => String, { description: '사용자 비밀번호' })
  password: string;
  @Field(() => String, { description: '임시 비밀번호' })
  temp_password: string;
  @Field(() => String, { description: '생성일' })
  created_at: string;
  @Field(() => [Float], { nullable: true, description: 'sort value' })
  sort?: number[];
}

@ObjectType({ description: '사용자 리스트' })
export class UserList {
  @Field(() => Int, { description: '사용자 수' })
  total: number;
  @Field(() => [User], { description: '사용자 리스트' })
  data: User[];
}
