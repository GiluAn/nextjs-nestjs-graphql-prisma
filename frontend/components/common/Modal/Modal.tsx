import CloseIcon from '@components/icons/Close';
import { IconButton } from '../Button';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalSection,
  ModalTitle,
  ModalWrapper,
} from './Modal.style';

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const Modal = ({ title, children, visible, onClose }: ModalProps) => {
  if (!visible) return null;
  return (
    <ModalWrapper tabIndex={-1} role="dialog" aria-modal={true}>
      <ModalSection>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalSection>
    </ModalWrapper>
  );
};

export default Modal;
