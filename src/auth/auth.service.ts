import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from 'src/core/dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      // TODO: add in bcrypt
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLogin: LoginUserInput): Promise<any> {
    // TODO: edit payload sub!
    const user = await this.validateUser(userLogin.email, userLogin.password);
    console.log(user);
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  //   async validateJwtPayload(payload: LoginUserInput): Promise<User | undefined> {
  //     // This will be used when the user has already logged in and has a JWT
  //     const user = await this.userService.findByEmail(payload.email);
  //     if (user) {
  //       return user;
  //     }
  //     return undefined;
  //   }
  //   async createJwt(user: User): Promise<LoginResult> {
  //     // const expiresIn = this.configService.jwtExpiresIn;
  //     const expiresIn = 60;
  //     let expiration: Date | undefined;
  //     if (expiresIn) {
  //       expiration = new Date();
  //       expiration.setTime(expiration.getTime() + expiresIn * 1000);
  //     }
  //     const data: LoginResult = {
  //       email: user.email,
  //       id: user.id,
  //       expiration,
  //     };
  //     const jwt = this.jwtService.sign(data);
  //     return {
  //       data,
  //       token: jwt,
  //     };
  //   }
  // async validateUserByPassword(
  //   loginAttempt: AuthInput,
  // ): Promise<LoginResult | undefined> {
  //   // This will be used for the initial login
  //   let userToAttempt: User | undefined;
  //   if (loginAttempt.email) {
  //     userToAttempt = await this.userService.findByEmail(loginAttempt.email);
  //   }
  //   // If the user is not enabled, disable log in - the token wouldn't work anyways
  //   if (userToAttempt && userToAttempt.enabled === false)
  //     userToAttempt = undefined;
  //   if (!userToAttempt) return undefined;
  //   // Check the supplied password against the hash stored for this email address
  //   let isMatch = false;
  //   try {
  //     isMatch = await userToAttempt.checkPassword(loginAttempt.password);
  //   } catch (error) {
  //     return undefined;
  //   }
  //   if (isMatch) {
  //     // If there is a successful match, generate a JWT for the user
  //     const token = this.createJwt(userToAttempt!).token;
  //     const result: LoginResult = {
  //       user: userToAttempt!,
  //       token,
  //     };
  //     userToAttempt.timestamp = new Date();
  //     userToAttempt.save();
  //     return result;
  //   }
  //   return undefined;
  // }
}
