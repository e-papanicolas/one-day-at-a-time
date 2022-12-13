import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  allTestUsers,
  testErrorUpdateInput,
  testUserCreateInput,
  testUserResult,
  testUserUpdateInput,
} from './user.mocks';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

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
      const result = await service.create(testUserCreateInput);

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

  describe('throws a conflict exception during create', () => {
    it('throws when the user already exists', async () => {
      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(new ConflictException('User already exists'));

      expect(
        await service.create(testUserCreateInput).catch((e) => e),
      ).toBeInstanceOf(ConflictException);
    });
  });

  describe('throws a not found exception during findOneById', () => {
    it('throws when the userId does not exist', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockRejectedValue(
          new NotFoundException('User not found with provided id'),
        );

      expect(await service.findOneById(2).catch((e) => e)).toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('throws a not found exceptio during update', () => {
    it('throws when the userId does not exist', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockRejectedValue(
          new NotFoundException('User not found with provided id'),
        );

      expect(
        await service.update(testErrorUpdateInput).catch((e) => e),
      ).toBeInstanceOf(NotFoundException);
    });
  });
});
