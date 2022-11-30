import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResult, LoginUserInput } from '../../core/dto/auth.input';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (passwordMatch) return user;
    }
    return null;
  }

  async login(userLogin: LoginUserInput): Promise<LoginResult> {
    const user = await this.validateUser(userLogin.email, userLogin.password);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return {
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Incorrect login credentials');
    }
  }
}
