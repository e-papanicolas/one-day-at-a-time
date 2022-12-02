import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EntryService } from './entry.service';
import { Entry } from '@prisma/client';
import { Entry as EntryEntity } from '../../core/entities/entry.entity';
import { CreateEntryInput, UpdateEntryInput } from '../../core/dto/entry.input';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { Note as NoteEntity } from '../../core/entities/note.entity';
import { Note } from '@prisma/client';
import { NoteService } from '../../modules/note/note.service';

@Resolver(() => EntryEntity)
export class EntryResolver {
  constructor(
    private readonly entryService: EntryService,
    @Inject(NoteService) private readonly noteService: NoteService,
  ) {}

  @Mutation(() => EntryEntity)
  async createEntry(
    @Args('createEntryInput') createEntryInput: CreateEntryInput,
  ): Promise<Entry> {
    return this.entryService.create(createEntryInput);
  }

  @Query(() => EntryEntity, { name: 'entry' })
  async findOneById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Entry | null> {
    return this.entryService.findOneById(id);
  }

  @ResolveField('notes', () => [NoteEntity])
  async getNotes(@Parent() entry: Entry): Promise<Note[]> {
    const id = entry.id;
    return this.noteService.findAll(id);
  }

  @Mutation(() => EntryEntity)
  async updateEntry(
    @Args('updateEntryInput') updateEntryInput: UpdateEntryInput,
  ): Promise<Entry> {
    return this.entryService.update(updateEntryInput);
  }

  @Mutation(() => EntryEntity, { nullable: true })
  async removeEntry(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Entry | null> {
    return this.entryService.remove(id);
  }
}
