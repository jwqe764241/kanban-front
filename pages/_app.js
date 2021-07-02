/* eslint-disable */
import GlobalStyles from "styles/global-styles";

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default App;
