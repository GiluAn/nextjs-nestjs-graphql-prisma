import { Button, Layout } from '@components/common';
import TextInput from '@components/common/Form/TextInput';
import Modal from '@components/common/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

// import tw from 'tailwind-styled-components';

// const Title = tw.h1`
//   flex
//   justify-center
//   text-red-300
//   text-xl
// `;
const Title = styled.h1`
  ${tw`flex justify-center text-red-300 text-xl`}
`;
export default function Home() {
  const [visible, setVisible] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };

  const onclose = () => {
    setVisible(false);
  };
  return (
    <Layout>
      <button onClick={onOpen}>open</button>
      <Modal title="로그인" visible={visible} onClose={onclose}>
        <TextInput label="아이디" />
        <TextInput label="비밀번호" type="password" />
        <Button onClick={() => console.log('TESST ')}>로그인</Button>
      </Modal>
      <Title>Hello World!</Title>{' '}
    </Layout>
  );
}
