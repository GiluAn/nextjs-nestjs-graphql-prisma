import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guards/refresh-token.guard';
import { accessCookieOpsions, refreshCookieOpsions } from 'src/common/constants';
import { AuthUser, GqlResopnse } from 'src/common/decorators';
import { User } from 'src/graphql.schema';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  getUser(@Context() context: any, @Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Query('auth')
  async auth(@Context() context: any) {
    const { id } = context.req.user;

    return this.userService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation('signIn')
  async signIn(@GqlResopnse() res: Response, @AuthUser() authUser: User) {
    const { accessToken, refreshToken } = await this.authService.generateUserToken(authUser);
    res.cookie('access-token', accessToken, accessCookieOpsions);
    res.cookie('refresh-token', refreshToken, refreshCookieOpsions);

    return authUser;
  }

  @UseGuards(JwtRefreshGuard)
  @Mutation('refreshToken')
  async refresh(@GqlResopnse() res: Response, @AuthUser() authUser: User) {
    const { accessToken, refreshToken } = await this.authService.generateUserToken(authUser);
    res.cookie('access-token', accessToken, accessCookieOpsions);
    res.cookie('refresh-token', refreshToken, refreshCookieOpsions);

    return true;
  }

  @Mutation('signOut')
  async signOut(@GqlResopnse() res: Response) {
    res.cookie('access-token', '', { maxAge: -1, path: '/' });
    res.cookie('refresh-token', '', { maxAge: -1, path: '/' });

    return true;
  }
}
