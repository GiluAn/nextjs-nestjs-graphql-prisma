import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/common';
import client from '@graphql/client';
import AuthProvider from 'lib/providers/AuthProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

// export default function App({ Component, pageProps }: AppProps) {
// console.log(pageProps);
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(session);
  return (
    <>
      <Head>
        <title>TEST</title>
      </Head>
      {/* <GlobalStyles /> */}
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export function getStaticProps() {
  console.log('_app, getStaticProps');
  return {};
}
