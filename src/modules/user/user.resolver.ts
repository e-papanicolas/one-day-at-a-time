import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../../core/entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../../core/dto/user.input';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { EntryService } from '../../modules/entry/entry.service';
import { Entry } from '@prisma/client';
import { CurrentUser } from '../../modules/auth/auth.guard';
import { Public } from '../../modules/auth/auth.decorator';
import { Entry as EntryEntity } from '../../core/entities/entry.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
  ) {}

  @Query(() => User, { name: 'currentUser' })
  async whoAmI(@CurrentUser() user: User): Promise<User | null> {
    return this.userService.findOneByEmail(user.email);
  }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Public()
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @ResolveField('entries', () => [EntryEntity])
  async getEntries(@Parent() user: User): Promise<Entry[]> {
    const id = user.id;
    return this.entryService.findAll(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User, { nullable: true })
  async removeUser(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
