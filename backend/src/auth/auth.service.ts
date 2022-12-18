import { Injectable } from '@nestjs/common';
import { User } from 'src/graphql.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { pbkdf2Sync } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.userService.findUser(userId);

    const inputHash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (user && user.password === inputHash) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }
}
