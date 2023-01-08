import { GetServerSideProps } from 'next';

export default function Home() {
  return <>HOME</>;
}

interface Props {
  user: any | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  console.log('serverSide');
  return { props: { user: null } };
  // const session = await getSessionFromCookie(req.headers.cookie)

  // if (session && new Date(session.expiresAt) > new Date()) {
  //   return { props: { user: session.user } }
  // } else {
  //   return { props: { user: null } }
  // }
};
