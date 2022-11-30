import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;
  let prismaService: PrismaService;

  const mockPrismaService = () => ({
    note: {
      findOneById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
    $queryRaw: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: PrismaService,
          useFactory: mockPrismaService,
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
