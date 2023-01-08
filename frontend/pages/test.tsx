export default function Test() {
  return <>Test</>;
}

export function getServerSideProps() {
  console.log('_test, getServerSideProps');

  return {
    props: {
      session: 'TEST',
    },
  };
}
