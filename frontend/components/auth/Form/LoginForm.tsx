import { ApolloError, useMutation } from '@apollo/client';
import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import { SIGN_IN } from 'lib/graphql/user';
import useFrom from 'lib/hooks/useForm';
import { useAuth } from 'lib/providers/AuthProvider';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
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
      const result = await signIn(input);
      console.log('TEST', result);
      if (result) {
        onClose();
      }
    } catch (e) {
      let errorMessage = '로그인 실패하였습니다.';
      if (e instanceof ApolloError) {
        const unauthenticated = e.graphQLErrors.some(
          (ge) => (ge.extensions as any)?.code === 'UNAUTHENTICATED'
        );
        if (unauthenticated) {
          errorMessage = '로그인 정보가 없습니다.';
        }
      }
      alert(errorMessage);
    }
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
