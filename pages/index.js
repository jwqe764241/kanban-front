function Home() {
  return <div>Hello</div>;
}

export async function getServerSideProps(context) {
  return { props: {} };
}

export default Home;
