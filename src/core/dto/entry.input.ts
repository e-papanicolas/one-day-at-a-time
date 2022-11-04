import { InputType, ID, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateEntryInput {
  @Field()
  image_url: string;

  @Field()
  date: Date;

  @Field()
  userId: number;
}

@InputType()
export class UpdateEntryInput extends PartialType(CreateEntryInput) {
  @Field(() => ID)
  id: number;

  @Field()
  image_url: string;

  @Field()
  date: Date;

  @Field()
  userId: number;
}
