import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import useFrom from 'lib/hooks/useForm';

interface LoginFormProps {
  closeModal: () => void;
}

const LoginForm = ({ closeModal }: LoginFormProps) => {
  const [input, onChange] = useFrom({
    userId: '',
    password: '',
  });
  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    console.log('TEST', input);
    closeModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextInput label="아이디" name="userId" onChange={onChange} />
      <TextInput label="비밀번호" name="password" type="password" onChange={onChange} />
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default LoginForm;
