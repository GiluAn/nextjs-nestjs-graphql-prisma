import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [AuthModule],
  providers: [UserResolver, UserService, AuthService, JwtService, TokenService],
})
export class UserModule {}
