import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findUser(userId: string) {
    return this.prisma.user.findFirst({
      where: { userId: userId },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id: id },
    });
  }

  upsertRefreshToken(userId: string, token: string) {
    return this.prisma.refreshToken.upsert({
      create: {
        userId: userId,
        token: token,
      },
      update: {
        token: token,
      },
      where: { userId: userId },
    });
  }
}
