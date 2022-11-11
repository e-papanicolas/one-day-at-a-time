import { Inject, Injectable } from '@nestjs/common';
import { Entry } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntryInput, UpdateEntryInput } from '../core/dto/entry.input';

@Injectable()
export class EntryService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createEntryInput: CreateEntryInput): Promise<Entry> {
    return this.prisma.entry.create({
      data: createEntryInput,
    });
  }

  async findAll(userId: number): Promise<Entry[]> {
    return this.prisma.entry.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number): Promise<Entry | null> {
    return this.prisma.entry.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateEntryInput: UpdateEntryInput): Promise<Entry> {
    return this.prisma.entry.update({
      where: {
        id: updateEntryInput.id,
      },
      data: updateEntryInput,
    });
  }

  async remove(id: number): Promise<Entry | null> {
    return this.prisma.entry.delete({
      where: {
        id,
      },
    });
  }
}
