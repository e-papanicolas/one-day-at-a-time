import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../core/dto/user.input';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data: createUserInput });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...otherParams } = updateUserInput;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...otherParams,
      },
    });
  }

  async remove(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
