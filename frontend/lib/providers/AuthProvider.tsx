import client from '@graphql/client';
import { GET_CURRENT_USER, SIGN_IN, SIGN_OUT } from '@graphql/user';
import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react';
import { User } from 'types/user';

export interface AuthState {
  authenticated: boolean;
  isLoading: boolean;
  user?: User | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  signIn: Function;
  signOut: Function;
}

const AuthContext = createContext<AuthContextType>({
  state: {
    authenticated: false,
    isLoading: false,
    user: null,
  },
  dispatch: () => {},
  signIn: () => {},
  signOut: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user,
      };
    case 'LOAD_FAIL':
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case 'SIGN_OUT':
      return {
        authenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      throw new Error('Unhandled action');
  }
};

interface AuthProviderProps {
  defaultAuthenticated?: boolean;
  children?: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    userLoad();
  }, []);

  const userLoad = async () => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading: true } });
    try {
      const currentUser = await client.query({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });

      dispatch({
        type: 'LOAD_SUCCESS',
        payload: { user: currentUser.data, authenticated: true },
      });
    } catch (e) {
      dispatch({
        type: 'LOAD_FAIL',
        payload: { user: null, authenticated: false },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
    }
  };

  const signIn = async ({ userId, password }: { userId: String; password: String }) => {
    try {
      await client.mutate({
        mutation: SIGN_IN,
        variables: { input: { userId, password } },
      });
      userLoad();
    } catch (e) {
      dispatch({
        type: 'LOAD_FAIL',
        payload: { user: null, authenticated: false },
      });
    }
  };

  const signOut = async () => {
    await client.mutate({ mutation: SIGN_OUT });
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
