import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { EntryService } from '../../modules/entry/entry.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import {
  allTestUsers,
  testUserEntries,
  testUserCreateInput,
  testUserResult,
  testUserUpdateInput,
} from './user.mocks';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  let entryService: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, EntryService, PrismaService],
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

  it('should return a created user', async () => {
    jest.spyOn(userService, 'create').mockResolvedValue(testUserResult);

    const result = await resolver.createUser(testUserCreateInput);

    expect(result).toMatchObject(testUserResult);
  });

  it('should return an array of users', async () => {
    jest.spyOn(userService, 'findAll').mockResolvedValue(allTestUsers);

    const result = await resolver.findAll();

    expect(result).toMatchObject(allTestUsers);
  });

  it('should return a user', async () => {
    jest.spyOn(userService, 'findOneById').mockResolvedValue(testUserResult);

    const result = await resolver.findOneById(1);

    expect(result).toMatchObject(testUserResult);
  });

  it('should resolve to the users entries', async () => {
    jest.spyOn(entryService, 'findAll').mockResolvedValue(testUserEntries);

    const result = await resolver.getEntries(testUserResult);

    expect(result).toMatchObject(testUserEntries);
  });

  it('should return an updated user', async () => {
    jest.spyOn(userService, 'update').mockResolvedValue(testUserResult);

    const result = await resolver.updateUser(testUserUpdateInput);

    expect(result).toMatchObject(testUserResult);
  });

  it('should return the removed user', async () => {
    jest.spyOn(userService, 'remove').mockResolvedValue(testUserResult);

    const result = await resolver.removeUser(1);

    expect(result).toMatchObject(testUserResult);
  });
});
