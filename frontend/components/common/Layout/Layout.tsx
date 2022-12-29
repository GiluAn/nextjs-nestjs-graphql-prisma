import { LoginModal } from '@components/auth';
import { Navbar } from '@components/common';
import { useCallback, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false);
  const openLoginModal = useCallback(() => {
    setVisibleLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setVisibleLoginModal(false);
  }, []);

  return (
    <>
      <LoginModal visible={visibleLoginModal} closeModal={closeLoginModal} />
      <Navbar openLoginModal={openLoginModal} />
      {children}
    </>
  );
};

export default Layout;
