import { ButtonColorType } from 'styles/palette';
import { ButtonWrapper } from './Button.style';

interface ButtonProps {
  onClick: () => void;
  children: any;
  color?: ButtonColorType;
}

const IconButton = ({ onClick, children, color = 'primary' }: ButtonProps) => {
  return (
    <ButtonWrapper color={color} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default IconButton;
