import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class CreateEntryInput {
  @Field()
  image_url: string;

  @Field()
  date: Date;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class UpdateEntryInput extends PartialType(CreateEntryInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  image_url: string;

  @Field({ nullable: true })
  date: Date;
}
