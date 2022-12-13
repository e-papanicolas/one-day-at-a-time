import { CreateUserInput, UpdateUserInput } from '../../core/dto/user.input';
import { Entry } from '../../core/entities/entry.entity';
import { User } from '../../core/entities/user.entity';

export const testUserResult = {
  id: 1,
  email: 'tester@email.com',
  name: 'Tester',
  password: 'password',
} as User;

export const testUserEntries = [{ id: 1 }, { id: 2 }] as Entry[];

export const testUserTwo = {
  id: 2,
  name: 'Eleni',
  email: 'eleni@test.com',
  password: 'password',
} as User;

export const testUserCreateInput = {
  name: 'Tester',
  email: 'tester@email.com',
  password: 'password',
} as CreateUserInput;

export const testUserUpdateInput = {
  id: 1,
  name: 'Tester',
  email: 'tester@email.com',
} as UpdateUserInput;

export const testErrorUpdateInput = {
  id: 3,
} as UpdateUserInput;

export const allTestUsers = [testUserResult, testUserTwo];
