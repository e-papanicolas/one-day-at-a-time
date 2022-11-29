import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResult, LoginUserInput } from 'src/core/dto/auth.input';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResult)
  async login(
    @Args('loginInput') loginInput: LoginUserInput,
  ): Promise<LoginResult> {
    const result = await this.authService.login(loginInput);
    return result;
  }
}