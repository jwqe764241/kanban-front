/* eslint-disable */
import GlobalStyles from "styles/global-styles";
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
      <GlobalStyles />
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
