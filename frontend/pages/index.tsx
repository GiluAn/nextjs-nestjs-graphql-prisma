import { Layout } from '@components/common';
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
  return (
    <Layout>
      {' '}
      <Title>Hello World!</Title>{' '}
    </Layout>
  );
}
