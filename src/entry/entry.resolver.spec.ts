import { Test, TestingModule } from '@nestjs/testing';
import { EntryResolver } from './entry.resolver';
import { EntryService } from './entry.service';

describe('EntryResolver', () => {
  let resolver: EntryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntryResolver, EntryService],
    }).compile();

    resolver = module.get<EntryResolver>(EntryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
