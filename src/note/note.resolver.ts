import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from '../core/entities/note.entity';
import { CreateNoteInput, UpdateNoteInput } from '../core/dto/note.input';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  async createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.noteService.create(createNoteInput);
  }

  @Query(() => Note, { name: 'note' })
  async findOne(@Args('id', ParseIntPipe) id: number) {
    return this.noteService.findOne(id);
  }

  @Mutation(() => Note)
  async updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.noteService.update(updateNoteInput);
  }

  @Mutation(() => Note)
  async removeNote(@Args('id', ParseIntPipe) id: number) {
    return this.noteService.remove(id);
  }
}
