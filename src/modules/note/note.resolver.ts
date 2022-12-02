import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note as NoteEntity } from '../../core/entities/note.entity';
import { Note } from '@prisma/client';
import { CreateNoteInput, UpdateNoteInput } from '../../core/dto/note.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => NoteEntity)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => NoteEntity)
  async createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
  ): Promise<Note> {
    return this.noteService.create(createNoteInput);
  }

  @Query(() => NoteEntity, { name: 'note' })
  async findOneById(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<Note | null> {
    return this.noteService.findOneById(id);
  }

  @Mutation(() => NoteEntity)
  async updateNote(
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ): Promise<Note> {
    return this.noteService.update(updateNoteInput);
  }

  @Mutation(() => NoteEntity, { nullable: true })
  async removeNote(@Args('id', ParseIntPipe) id: number): Promise<Note | null> {
    return this.noteService.remove(id);
  }
}
