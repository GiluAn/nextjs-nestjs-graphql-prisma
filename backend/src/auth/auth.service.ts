import { accessJwtOptions, refreshJwtOptions } from '@constants';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { User } from 'src/graphql.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.userService.findUser(userId);
    const inputHash = pbkdf2Sync(password, user?.salt, 1000, 64, 'sha512').toString('hex');
    if (user && user.password === inputHash) {
      return user;
    }

    return null;
  }

  async signIn(user: User) {
    const payload = { name: user.name, sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, accessJwtOptions),
      this.jwtService.signAsync(payload, refreshJwtOptions),
    ]);

    return { accessToken, refreshToken };
  }

  refreshAccessToken(user: User) {
    const payload = { name: user.name, sub: user.id };

    return this.jwtService.sign(payload, accessJwtOptions);
  }
}
