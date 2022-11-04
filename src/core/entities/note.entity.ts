import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entry } from './entry.entity';

@ObjectType()
export class Note {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field()
  entryId: number;
}
