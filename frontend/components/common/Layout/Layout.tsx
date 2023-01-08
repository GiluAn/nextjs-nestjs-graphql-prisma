import { LoginModal } from '@components/auth';
import { Navbar } from '@components/common';
import { useCallback, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false);
  const openHandler = useCallback(() => {
    setVisibleLoginModal(true);
  }, []);

  const closeHandler = useCallback(() => {
    setVisibleLoginModal(false);
  }, []);

  return (
    <>
      <LoginModal visible={visibleLoginModal} onClose={closeHandler} />
      <Navbar onOpen={openHandler} />
      {children}
    </>
  );
};

export default Layout;
