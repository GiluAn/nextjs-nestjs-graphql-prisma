import { useMutation } from '@apollo/client';
import { Button } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import { SINGN_IN } from 'lib/graphql/user';
import useFrom from 'lib/hooks/useForm';

interface LoginFormProps {
  closeModal: () => void;
}

const LoginForm = ({ closeModal }: LoginFormProps) => {
  const [signIn] = useMutation(SINGN_IN);
  const [input, onChange] = useFrom({
    userId: '',
    password: '',
  });
  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const { data } = await signIn({
        variables: {
          input: input,
        },
      });
      console.log(data);
      // closeModal();
    } catch (e) {
      // console.log(e.message);
      console.log(e);
    }
    console.log('TEST', input);
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
