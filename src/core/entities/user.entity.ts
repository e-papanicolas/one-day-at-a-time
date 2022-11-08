import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entry } from './entry.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Entry], { nullable: 'items' })
  entries?: Entry[] | null;
}
