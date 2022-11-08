import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteInput, UpdateNoteInput } from '../core/dto/note.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createNoteInput: CreateNoteInput) {
    return this.prisma.note.create({ data: createNoteInput });
  }

  async findAll(entryId: number) {
    return this.prisma.note.findMany({
      where: {
        entryId,
      },
    });
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
