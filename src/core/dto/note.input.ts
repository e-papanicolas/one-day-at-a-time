import { InputType, ID, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  content: string;

  @Field()
  entryId: number;
}

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;
}
