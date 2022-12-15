import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../../core/dto/user.input';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const email = createUserInput.email;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserInput.password, salt);
      createUserInput.password = hashedPassword;

      return this.prisma.user.create({
        data: createUserInput,
      });
    } else {
      throw new ConflictException('User already exists');
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) return user;
    else {
      throw new NotFoundException('User not found with provided id');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return user;
    else {
      throw new NotFoundException('User not found with provided email');
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...otherParams } = updateUserInput;

    const userToUpdate = await this.findOneById(id);
    if (userToUpdate) {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...otherParams,
        },
      });
    } else {
      throw new NotFoundException('User not found with provided id');
    }
  }

  async remove(id: number): Promise<User> {
    const userToDelete = await this.findOneById(id);
    if (userToDelete) {
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    } else {
      throw new NotFoundException('User not found with provided id');
    }
  }
}
