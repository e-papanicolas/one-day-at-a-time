import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Note } from './note.entity';

// TODO: use the scalar for dateTime here

@ObjectType()
export class Entry {
  @Field(() => ID)
  id: number;

  @Field()
  image_url: string;

  @Field()
  date: Date;

  @Field()
  userId: number;

  @Field(() => [Note], { nullable: true })
  notes?: Note[] | null;
}
