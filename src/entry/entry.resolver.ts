import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EntryService } from './entry.service';
import { Entry } from '../core/entities/entry.entity';
import { CreateEntryInput, UpdateEntryInput } from '../core/dto/entry.input';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { Note } from 'src/core/entities/note.entity';
import { NoteService } from 'src/note/note.service';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    private readonly entryService: EntryService,
    @Inject(NoteService) private readonly noteService: NoteService,
  ) {}

  @Mutation(() => Entry)
  async createEntry(
    @Args('createEntryInput') createEntryInput: CreateEntryInput,
  ): Promise<Entry> {
    return this.entryService.create(createEntryInput);
  }

  @Query(() => Entry, { name: 'entry' })
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<Entry | null> {
    return this.entryService.findOne(id);
  }

  @ResolveField('notes', () => [Note])
  async getNotes(@Parent() entry: Entry): Promise<Note[]> {
    const id = entry.id;
    return this.noteService.findAll(id);
  }

  @Mutation(() => Entry)
  async updateEntry(
    @Args('updateEntryInput') updateEntryInput: UpdateEntryInput,
  ): Promise<Entry> {
    return this.entryService.update(updateEntryInput);
  }

  @Mutation(() => Entry, { nullable: true })
  async removeEntry(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Entry | null> {
    return this.entryService.remove(id);
  }
}
