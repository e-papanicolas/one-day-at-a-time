import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  content: string;

  @Field(() => Int)
  entryId: number;
}

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  content: string;
}
