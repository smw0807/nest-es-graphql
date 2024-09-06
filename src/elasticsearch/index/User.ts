import { RegisterIndex } from '@codemask-labs/nestjs-elasticsearch';

@RegisterIndex('user')
export class UserDocument {
  readonly user_id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly temp_password: string;
  readonly created_at: Date;
}
