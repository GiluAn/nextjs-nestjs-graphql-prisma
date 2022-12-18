import { generateUserToken, setUserTokenCokie } from '@lib';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserInput, SignInInput, UpdateUserInput } from 'src/graphql.schema';
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
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation('signIn')
  async signIn(@Context() context: any, @Args('signInInput') signInInput: SignInInput) {
    const { userId, password } = signInInput;
    const user = await this.authService.validateUser(userId, password);
    console.log('req?.cookies', context.req);
    console.log('req?.cookies2', context.req?.headers?.cookie);
    if (user) {
      const session = {
        id: user.id,
        userId: user.userId,
      };
      const tokens = generateUserToken(user);
      // console.log(token);
      console.log(context.cookie);

      setUserTokenCokie(context, tokens);
      // await setLoginSession(context.res, session)
      // context.res.cookie('test_token', tokens, {
      //   httpOnly: true,
      //   // sameSite: 'none',
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      //   // domain: 'localhost:3001',
      // });
      console.log(user);
      return user;
    }

    console.log(user);
    throw new ApolloError('Invalid email and password combination');
  }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
