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

  describe('create', () => {
    it('should create a new user', async () => {
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(testUserResult);
      const result = await service.create(testUserCreateInput);

      expect(result).toMatchObject(testUserResult);
    });
  });

  describe('find one', () => {
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

  describe('find all', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(allTestUsers);

      expect(await service.findAll()).toBe(allTestUsers);
    });
  });

  describe('update', () => {
    it('should return an updated user', async () => {
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(testUserResult);

      const result = await service.update(testUserUpdateInput);

      expect(result).toEqual(testUserResult);
    });
  });

  describe('remove', () => {
    it('should return the deleted user', async () => {
      jest
        .spyOn(prismaService.user, 'delete')
        .mockResolvedValue(testUserResult);

      const result = await service.remove(testUserResult.id);

      expect(result).toEqual(testUserResult);
    });
  });

  describe('errors', () => {
    it('throw a conflict exception when the user already exists', async () => {
      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(new ConflictException('User already exists'));

      expect(
        await service.create(testUserCreateInput).catch((e) => e),
      ).toBeInstanceOf(ConflictException);
    });
    it('throws a not found exception when the userId does not exist', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockRejectedValue(
          new NotFoundException('User not found with provided id'),
        );

      expect(await service.findOneById(2).catch((e) => e)).toBeInstanceOf(
        NotFoundException,
      );
    });

    it('throws a not found exception when the userId does not exist', async () => {
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
