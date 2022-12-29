import { useMutation } from '@apollo/client';
import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import { SIGN_IN } from 'lib/graphql/user';
import useFrom from 'lib/hooks/useForm';
import { useAuth } from 'lib/providers/AuthProvider';

interface LoginFormProps {
  closeModal: () => void;
}

const LoginForm = ({ closeModal }: LoginFormProps) => {
  // const { onSingnIn } = useAuth();
  // const [signIn] = useMutation(SIGN_IN);
  const { signIn } = useAuth();

  const [input, onChange] = useFrom({
    userId: '',
    password: '',
  });
  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const { data } = await signIn(input);

      closeModal();
    } catch (e) {}
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
