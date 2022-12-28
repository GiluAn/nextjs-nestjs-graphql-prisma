import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
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
    console.log(context.req?.headers?.cookie);
    return this.userService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Query('auth')
  async auth(@Context() context: any) {
    const { id } = context.req.user;
    console.log(context.req.user);
    return this.userService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation('signIn')
  async signIn(@GqlResopnse() res: Response, @AuthUser() authUser: User) {
    console.log('authUser', authUser);
    const { accessToken, refreshToken } = await this.authService.signIn(authUser);
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      maxAge: 60 * 1 * 1000, // 1hour
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 8 * 1000),
      // secure: process.env.NODE_ENV === 'production',
      path: '/',
      // sameSite: 'lax',
    });
    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 8, // 8d
      expires: new Date(Date.now() + 60 * 60 * 24 * 8 * 1000),
      // secure: process.env.NODE_ENV === 'production',
      path: '/',
      // sameSite: 'lax',
    });

    return authUser;
  }

  @Mutation('signOut')
  async signOut(@Context() context: any) {
    // removeTokenCookie(context);
    return true;
  }
}
