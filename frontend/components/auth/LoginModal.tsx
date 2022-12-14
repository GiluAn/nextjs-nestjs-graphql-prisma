import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import Modal from '@components/common/Modal';
import LoginForm from './Form/LoginForm';

interface LoginModalProps {
  visible: boolean;
  closeModal: () => void;
}

const LoginModal = ({ visible, closeModal }: LoginModalProps) => {
  return (
    <Modal title="로그인" visible={visible} closeModal={closeModal}>
      <LoginForm closeModal={closeModal} />
    </Modal>
  );
};

export default LoginModal;
