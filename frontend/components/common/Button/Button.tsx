import { ButtonColorType } from 'styles/palette';
import { ButtonWrapper } from './Button.style';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColorType;
  children: any;
}

const Button = ({ onClick, type = 'button', color = 'primary', children }: ButtonProps) => {
  return (
    <ButtonWrapper type={type} color={color} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
