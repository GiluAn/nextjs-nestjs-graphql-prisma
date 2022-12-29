import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/common';
import client from '@graphql/client';
import AuthProvider from 'lib/providers/AuthProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
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
