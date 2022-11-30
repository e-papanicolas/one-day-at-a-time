import { Test, TestingModule } from '@nestjs/testing';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';

describe('NoteResolver', () => {
  let resolver: NoteResolver;
  let noteService: NoteService;

  const mockNoteService = () => ({
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
        NoteResolver,
        {
          provide: NoteService,
          useFactory: mockNoteService,
        },
      ],
    }).compile();

    noteService = module.get<NoteService>(NoteService);
    resolver = module.get<NoteResolver>(NoteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(noteService).toBeDefined();
  });
});
