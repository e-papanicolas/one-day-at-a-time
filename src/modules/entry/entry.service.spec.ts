import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { EntryService } from './entry.service';

describe('EntryService', () => {
  let service: EntryService;
  let prismaService: PrismaService;

  const mockPrismaService = () => ({
    entry: {
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
        EntryService,
        {
          provide: PrismaService,
          useFactory: mockPrismaService,
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
