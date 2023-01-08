import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import Modal from '@components/common/Modal';
import LoginForm from './Form/LoginForm';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal = ({ visible, onClose }: LoginModalProps) => {
  return (
    <Modal title="로그인" visible={visible} onClose={onClose}>
      <LoginForm onClose={onClose} />
    </Modal>
  );
};

export default LoginModal;
