import { LoginModal } from '@components/auth';
import { Navbar } from '@components/common';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false);

  const openLoginModal = () => {
    setVisibleLoginModal(true);
  };

  const closeLoginModal = () => {
    setVisibleLoginModal(false);
  };

  return (
    <>
      <LoginModal visible={visibleLoginModal} closeModal={closeLoginModal} />
      <Navbar openLoginModal={openLoginModal} />
      {children}
    </>
  );
};

export default Layout;
