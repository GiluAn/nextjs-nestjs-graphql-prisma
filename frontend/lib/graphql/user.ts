import { gql } from '@apollo/client';

export const SINGN_IN = gql`
  mutation SignInMutation($input: SignInInput!) {
    signIn(signInInput: $input) {
      userId
    }
  }
`;
