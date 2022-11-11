import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [NoteService, PrismaService],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
