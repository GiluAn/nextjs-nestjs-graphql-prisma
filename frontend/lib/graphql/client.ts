import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from './user';

let client: ApolloClient<object>;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          console.log('graphQLErrors', operation.operationName);

          if (operation.operationName === 'RefreshToken') return;
          const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
            (async () => {
              try {
                await client.mutate({ mutation: REFRESH_TOKEN });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                forward(operation).subscribe(subscriber);
              } catch (e) {
                observer.error(err);
              }
            })();
          });

          return observable;
      }
    }
  }
});

client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  // ssrMode: typeof window === "undefined",
  // ssrForceFetchDelay: 100,
});

export default client;
