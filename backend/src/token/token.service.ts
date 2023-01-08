import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { accessJwtOptions, refreshJwtOptions } from '@constants';
import { User } from 'src/graphql.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class TokenService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  generateAccessToken(user: User) {
    const payload = { name: user.name, sub: user.id };

    return this.jwtService.sign(payload, accessJwtOptions);
  }

  async generateRefreshToken(user: User) {
    try {
      const payload = { name: user.name, sub: user.id };
      const token = this.jwtService.sign(payload, refreshJwtOptions);
      await this.userService.upsertRefreshToken(user.id, token);

      return token;
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
