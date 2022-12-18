import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@environments';
import { sign } from 'jsonwebtoken';
import { User } from 'src/graphql.schema';
import { serialize, parse } from 'cookie';

type TokenType = 'accessToken' | 'refreshToken';
const tokenOptions = {
  accessToken: {
    name: 'access-token',
    privateKey: ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: '15m', // 15m
    },
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60, // 1hour
      expires: new Date(Date.now() + 60 * 60 * 1000),
      // secure: process.env.NODE_ENV === 'production',
      path: '/',
      // sameSite: 'lax',
    },
  },
  refreshToken: {
    name: 'refresh-token',
    privateKey: REFRESH_TOKEN_SECRET,
    signOptions: {
      expiresIn: '7d', // 7d
    },
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 8, // 8d
      expires: new Date(Date.now() + 60 * 60 * 24 * 8 * 1000),
      // secure: process.env.NODE_ENV === 'production',
      path: '/',
      // sameSite: 'lax',
    },
  },
};

export const generateToken = (user: User, type: TokenType): string => {
  return sign({ id: user.id }, tokenOptions[type].privateKey, {
    subject: type,
    algorithm: 'HS256',
    expiresIn: tokenOptions[type].signOptions.expiresIn,
  });
};

export const generateUserToken = (user: User) => {
  const accessToken = generateToken(user, 'accessToken');
  const refreshToken = generateToken(user, 'refreshToken');

  return { accessToken, refreshToken };
};

export const setTokenCookie = (context: any, type: TokenType, token: string) => {
  const cookie = serialize(tokenOptions[type].name, token, tokenOptions[type].cookie);

  context.res.cookie(tokenOptions[type].name, cookie);
};

export const setUserTokenCokie = (
  context: any,
  tokens: { accessToken: string; refreshToken: string }
) => {
  setTokenCookie(context, 'accessToken', tokens.accessToken);
  setTokenCookie(context, 'refreshToken', tokens.refreshToken);
};
