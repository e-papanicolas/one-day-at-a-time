import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { EntryService } from './entry.service';
import { Entry } from '../core/entities/entry.entity';
import { CreateEntryInput, UpdateEntryInput } from '../core/dto/entry.input';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(private readonly entryService: EntryService) {}

  @Mutation(() => Entry)
  createEntry(@Args('createEntryInput') createEntryInput: CreateEntryInput) {
    return this.entryService.create(createEntryInput);
  }

  @Query(() => [Entry], { name: 'entry' })
  findAll() {
    return this.entryService.findAll();
  }

  @Query(() => Entry, { name: 'entry' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.entryService.findOne(id);
  }

  @Mutation(() => Entry)
  updateEntry(@Args('updateEntryInput') updateEntryInput: UpdateEntryInput) {
    return this.entryService.update(updateEntryInput);
  }

  @Mutation(() => Entry)
  removeEntry(@Args('id', { type: () => ID }) id: number) {
    return this.entryService.remove(id);
  }
}
