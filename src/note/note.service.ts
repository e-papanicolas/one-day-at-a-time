import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteInput, UpdateNoteInput } from '../core/dto/note.input';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createNoteInput: CreateNoteInput) {
    return this.prisma.note.create({ data: createNoteInput });
  }

  async findAll() {
    return this.prisma.note.findMany();
  }

  async findOne(id: number) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateNoteInput: UpdateNoteInput) {
    return this.prisma.note.update({
      where: {
        id: updateNoteInput.id,
      },
      data: {},
    });
  }

  async remove(id: number) {
    return this.prisma.note.delete({
      where: {
        id,
      },
    });
  }
}
