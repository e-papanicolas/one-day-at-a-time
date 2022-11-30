import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from '../note/note.service';
import { EntryResolver } from './entry.resolver';
import { EntryService } from './entry.service';

describe('EntryResolver', () => {
  let resolver: EntryResolver;
  let entryService: EntryService;
  let noteService: NoteService;

  const mockEntryService = () => ({
    entry: {
      findOneById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
    $queryRaw: jest.fn(),
  });

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
        EntryResolver,
        {
          provide: EntryService,
          useFactory: mockEntryService,
        },
        {
          provide: NoteService,
          useFactory: mockNoteService,
        },
      ],
    }).compile();

    entryService = module.get<EntryService>(EntryService);
    resolver = module.get<EntryResolver>(EntryResolver);
    noteService = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(entryService).toBeDefined();
    expect(noteService).toBeDefined();
  });
});
