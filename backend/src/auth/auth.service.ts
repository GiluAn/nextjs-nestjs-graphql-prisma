import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@environments';
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

    const inputHash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (user && user.password === inputHash) {
      return user;
    }
    return null;
  }

  async signIn(user: User) {
    const payload = { name: user.name, sub: user.id };
    console.log('payload', payload);
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
