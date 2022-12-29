import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignInMutation($input: SignInInput!) {
    signIn(signInInput: $input) {
      userId
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOutMutation {
    signOut
  }
`;

export const GET_CURRENT_USER = gql`
  query User {
    auth {
      name
      userId
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken
  }
`;
