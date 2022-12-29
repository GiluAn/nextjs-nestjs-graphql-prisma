import { REFRESH_TOKEN_SECRET } from '@environments';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { parse } from 'cookie';
import { Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  name: string;
};

const fromAuthHeaderAsCookie = function () {
  return function (request: any) {
    const cookie = request.cookies ? request.cookies : request.headers?.cookie;
    const token = parse(cookie || '');

    return token['refresh-token'];
  };
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: fromAuthHeaderAsCookie(),
      ignoreExpiration: false,
      secretOrKey: REFRESH_TOKEN_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, name: payload.name };
  }
}
