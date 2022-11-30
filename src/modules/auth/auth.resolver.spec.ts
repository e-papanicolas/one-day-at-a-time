import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  const mockAuthService = () => ({
    note: {
      validateUser: jest.fn(),
      login: jest.fn(),
    },
    $queryRaw: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        JwtService,
        {
          provide: AuthService,
          useFactory: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(authService).toBeDefined();
  });
});
