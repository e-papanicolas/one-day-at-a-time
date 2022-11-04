import { InputType, ID, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
