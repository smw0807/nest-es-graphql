import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphqlResolver {
  private readonly logger = new Logger(GraphqlResolver.name);
  constructor() {}

  @Query(() => String, { name: 'hello' })
  async hello() {
    this.logger.log('hello resolver');
    return 'Hello GraphQL';
  }
}
