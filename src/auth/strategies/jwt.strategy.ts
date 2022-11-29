import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService, // private configService: ConfigService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.jwtSecret,
      secretOrKey: 'secret',
      ignoreExpiration: false,
      userNameField: 'email',
    });
  }

  async validate(payload: any) {
    // further token validation, such as looking up the userId in a list of revoked tokens,
    const userId = payload.sub;
    const user = await this.userService.findOne(userId);
    return user;
  }
}
