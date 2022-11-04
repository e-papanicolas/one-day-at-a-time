import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntryInput, UpdateEntryInput } from '../core/dto/entry.input';

@Injectable()
export class EntryService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createEntryInput: CreateEntryInput) {
    return this.prisma.entry.create({
      data: createEntryInput,
    });
  }

  async findAll() {
    return this.prisma.entry.findMany();
  }

  async findOne(id: number) {
    return this.prisma.entry.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateEntryInput: UpdateEntryInput) {
    return this.prisma.entry.update({
      where: {
        id: updateEntryInput.id,
      },
      data: {},
    });
  }

  async remove(id: number) {
    return this.prisma.entry.delete({
      where: {
        id,
      },
    });
  }
}
