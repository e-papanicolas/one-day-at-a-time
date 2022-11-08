import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Note } from './note.entity';

// TODO: use the scalar for dateTime here

@ObjectType()
export class Entry {
  @Field(() => Int)
  id: number;

  @Field()
  image_url: string;

  @Field()
  date: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => [Note], { nullable: 'items' })
  notes?: Note[] | null;
}
