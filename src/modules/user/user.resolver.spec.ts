import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { EntryService } from '../../modules/entry/entry.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  let entryService: EntryService;

  const mockUserService = () => ({
    user: {
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
    $queryRaw: jest.fn(),
  });

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: mockUserService,
        },
        {
          provide: EntryService,
          useFactory: mockEntryService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    resolver = module.get<UserResolver>(UserResolver);
    entryService = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(userService).toBeDefined();
    expect(entryService).toBeDefined();
  });
});
