import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserResolver, UserService, AuthService],
})
export class UserModule {}
