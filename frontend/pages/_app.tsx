import '../styles/globals.css';
import { AppProps } from 'next/app';
import GlobalStyles from '@components/GlobalStyle';

export default function App({ Component, pageProps }: AppProps) {
  <GlobalStyles />;
  return <Component {...pageProps} />;
}
