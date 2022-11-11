import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntryService } from './entry.service';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [EntryService, PrismaService],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
