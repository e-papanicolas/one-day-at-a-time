import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  JWTPayload,
  LoginResult,
  LoginUserInput,
} from '../../core/dto/auth.input';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (passwordMatch) return user;
    else {
      throw new UnauthorizedException('Incorrect login credentials');
    }
  }

  async login(userLogin: LoginUserInput): Promise<LoginResult> {
    const user = await this.validateUser(userLogin.email, userLogin.password);

    const payload: JWTPayload = { email: user.email, sub: user.id };
    // TODO: need to handle undefined case
    const options = { secret: this.configService.get<string>('JWT_SECRET') };

    const token = this.jwtService.sign(payload, options);

    return {
      token,
    };
  }
}
