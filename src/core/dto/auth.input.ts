import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// @InputType()
// export class UpdatePasswordInput {
//   @Field()
//   oldPassword: string;
//   @Field()
//   newPassword: string;
// }

@ObjectType()
export class LoginResult {
  @Field()
  token: string;
}
