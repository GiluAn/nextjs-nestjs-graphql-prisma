import { IconButtonWrapper } from './IconButton.style';

interface IconButtonProps {
  onClick: () => void;
  children: any;
}

const IconButton = ({ onClick, children }: IconButtonProps) => {
  return <IconButtonWrapper onClick={onClick}>{children}</IconButtonWrapper>;
};

export default IconButton;
