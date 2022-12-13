import '../styles/globals.css';
import { AppProps } from 'next/app';
import GlobalStyles from '@components/GlobalStyle';
import Modal from '@components/common/Modal/Modal';

export default function App({ Component, pageProps }: AppProps) {
  <GlobalStyles />;
  // <Modal onClose={() => console.log('close')}>
  //   <>TEST</>
  // </Modal>;
  return <Component {...pageProps} />;
}
