import { generateUUID } from 'lib/common.fn';
import { Input, InputWrapper, Label } from './Textinput.style';

interface TextInputProps {
  className?: string;
  name?: string;
  type?: string;
  label?: string;
  onChange?: React.ChangeEventHandler;
}

const TextInput = ({ label, type = 'text', className, name, onChange }: TextInputProps) => {
  const id = generateUUID();

  return (
    <InputWrapper className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} name={name} onChange={onChange} autoComplete="off" />
    </InputWrapper>
  );
};

export default TextInput;
