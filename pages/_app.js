/* eslint-disable */
import GlobalStyle from "components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Theme from "components/Theme";
import wrapper from "core/store";
import { getCookie, parseJwtClaims } from "core/utils";

import Navbar from "components/layout/Navbar";

const excludePath = new Set(["/login", "/_error"]);

function MyApp({ Component, pageProps }) {
  const { pathname, auth } = pageProps;

  return excludePath.has(pathname) ? (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
        <div id="modal-root" />
      </ThemeProvider>
    </>
  ) : (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Navbar name={auth?.name} />
        <Component {...pageProps} />
        <div id="modal-root" />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx, Component } = appContext;
  const pageProps = {
    pathname: ctx.pathname,
  };

  const refreshToken = getCookie("REFRESH_TOKEN", ctx.req);
  if (refreshToken) {
    const payload = parseJwtClaims(refreshToken);
    pageProps.auth = {
      username: payload.username,
      name: payload.name,
    };
  }

  if (Component.getInitialProps) {
    const props = await Component.getInitialProps(ctx);
    Object.assign(pageProps, props);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);
