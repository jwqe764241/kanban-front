/* eslint-disable */
import GlobalStyles from "styles/global-styles";
import styled from "styled-components";

import Navbar from "components/layout/Navbar";

const Layout = styled.div``;

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
