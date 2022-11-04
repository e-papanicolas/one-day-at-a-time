import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entry } from './entry.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Entry, { nullable: true })
  entries?: Entry[] | null;
}
