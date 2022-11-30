import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteInput, UpdateNoteInput } from '../../core/dto/note.input';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Note } from '@prisma/client';

@Injectable()
export class NoteService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createNoteInput: CreateNoteInput): Promise<Note> {
    return this.prisma.note.create({ data: createNoteInput });
  }

  async findAll(entryId: number): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        entryId,
      },
    });
  }

  async findOneById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateNoteInput: UpdateNoteInput): Promise<Note> {
    return this.prisma.note.update({
      where: {
        id: updateNoteInput.id,
      },
      data: updateNoteInput,
    });
  }

  async remove(id: number): Promise<Note | null> {
    return this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
