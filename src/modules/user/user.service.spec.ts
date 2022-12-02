import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import {
  MockContext,
  Context,
  createMockContext,
} from '../../providers/prisma/context';
import { CreateUserInput } from 'src/core/dto/user.input';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        // {
        //   provide: PrismaService,
        //   useValue: mockCtx.prisma,
        // },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a new user', async () => {
    const user: CreateUserInput = {
      name: 'Test Name',
      email: 'test1@email.com',
      password: 'password',
    };

    mockCtx.prisma.user.create.mockResolvedValue({
      id: 1,
      name: 'Test Name',
      email: 'test1@email.com',
      password: 'password',
    });

    // await expect(service.create(user)).resolves.toMatchObject(user);
  });
});
