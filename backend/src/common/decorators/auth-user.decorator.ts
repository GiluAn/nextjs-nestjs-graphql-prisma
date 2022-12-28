import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';

export const AuthUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  console.log('authUser');
  const gqlContext = GqlExecutionContext.create(context).getContext();
  const user: User = gqlContext.req.user;
  console.log(user);
  return user;
});
