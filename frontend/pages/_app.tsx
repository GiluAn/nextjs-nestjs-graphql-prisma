import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/common';
import GlobalStyles from '@components/GlobalStyle';
import client from '@graphql/client';
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
