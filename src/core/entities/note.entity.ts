import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Int)
  entryId: number;
}
