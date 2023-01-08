import { Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';
import { User } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.userService.findUser(userId);
    const inputHash = pbkdf2Sync(password, user?.salt || '', 1000, 64, 'sha512').toString('hex');
    if (user && user.password === inputHash) {
      return user;
    }

    return null;
  }

  async validRefreshToken(userId: string, token: string): Promise<any> {
    return this.prisma.refreshToken.findFirst({
      where: { userId: userId, token: token },
    });
  }

  async generateUserToken(user: User) {
    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
