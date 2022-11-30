import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from '../../core/entities/note.entity';
import { CreateNoteInput, UpdateNoteInput } from '../../core/dto/note.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
  ): Promise<Note> {
    return this.noteService.create(createNoteInput);
  }

  @Query(() => Note, { name: 'note' })
  async findOneById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Note | null> {
    return this.noteService.findOneById(id);
  }

  @Mutation(() => Note)
  async updateNote(
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ): Promise<Note> {
    return this.noteService.update(updateNoteInput);
  }

  @Mutation(() => Note, { nullable: true })
  async removeNote(@Args('id', ParseIntPipe) id: number): Promise<Note | null> {
    return this.noteService.remove(id);
  }
}
