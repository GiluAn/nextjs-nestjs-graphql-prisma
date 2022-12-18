import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: `Bearer ${process.env.TOKEN}`,
    },
  };
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
  // link: authLink.concat(httpLink),
  credentials: 'include',
  cache: new InMemoryCache(),
  // ssrMode: typeof window === "undefined",
  // ssrForceFetchDelay: 100,
});

export default client;
