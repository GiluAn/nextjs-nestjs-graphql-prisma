import { generateUUID } from 'utils/common.fn';
import { Input, InputWrapper, Label } from './Textinput.style';

interface TextInputProps {
  className?: string;
  type?: string;
  label?: string;
}

const TextInput = ({ label, type = 'text', className }: TextInputProps) => {
  const id = generateUUID();

  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} />
    </InputWrapper>
  );
};

export default TextInput;
