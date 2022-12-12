import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from '../../core/dto/user.input';
import { User } from '../../core/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const testUserResult = {
    id: 1,
    email: 'tester@email.com',
    name: 'Tester',
    password: 'password',
  } as User;

  const testUserTwo = {
    id: 2,
    name: 'Eleni',
    email: 'eleni@test.com',
    password: 'password',
  } as User;

  const testUserInput = {
    name: 'Tester',
    email: 'tester@email.com',
    password: 'password',
  } as CreateUserInput;

  const testUserUpdateInput = {
    id: 1,
    name: 'Tester',
    email: 'tester@email.com',
  } as UpdateUserInput;

  const allTestUsers = [testUserResult, testUserTwo];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(testUserResult);
      const result = await service.create(testUserInput);

      expect(result).toMatchObject(testUserResult);
    });
  });

  describe('find unique users', () => {
    it('should return a user by id', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(testUserResult);
      const result = await service.findOneById(testUserResult.id);

      expect(result).toEqual(testUserResult);
    });

    it('should return a user by email', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(testUserResult);
      const result = await service.findOneByEmail(testUserResult.email);

      expect(result).toEqual(testUserResult);
    });
  });

  describe('find many users', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(allTestUsers);

      expect(await service.findAll()).toBe(allTestUsers);
    });
  });

  describe('updates a user', () => {
    it('should return an updated user', async () => {
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(testUserResult);

      const result = await service.update(testUserUpdateInput);

      expect(result).toEqual(testUserResult);
    });
  });

  describe('removes a user', () => {
    it('should return the removed user', async () => {
      jest
        .spyOn(prismaService.user, 'delete')
        .mockResolvedValue(testUserResult);

      const result = await service.remove(testUserResult.id);

      expect(result).toEqual(testUserResult);
    });
  });
});
