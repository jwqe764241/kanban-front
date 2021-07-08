/* eslint-disable */
import "styles/reset.css";
import "styles/global.css";
import styled from "styled-components";

import Navbar from "components/layout/Navbar";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
