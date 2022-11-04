import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from '../core/entities/note.entity';
import { CreateNoteInput, UpdateNoteInput } from '../core/dto/note.input';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  async createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.noteService.create(createNoteInput);
  }

  @Query(() => [Note], { name: 'note' })
  async findAll() {
    return this.noteService.findAll();
  }

  @Query(() => Note, { name: 'note' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.noteService.findOne(id);
  }

  @Mutation(() => Note)
  async updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.noteService.update(updateNoteInput);
  }

  @Mutation(() => Note)
  async removeNote(@Args('id', { type: () => ID }) id: number) {
    return this.noteService.remove(id);
  }
}
