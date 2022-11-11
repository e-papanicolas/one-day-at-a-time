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
import { User } from '../core/entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../core/dto/user.input';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { EntryService } from 'src/entry/entry.service';
import { Entry } from 'src/core/entities/entry.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ResolveField('entries', () => [Entry])
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
  async removeUser(@Args('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.remove(id);
  }
}
