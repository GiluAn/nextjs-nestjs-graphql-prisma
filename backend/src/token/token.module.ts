import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, UserService, JwtService],
})
export class TokenModule {}
