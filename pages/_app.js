/* eslint-disable */
import wrapper from "core/store";
import { getCookie, parseJwtClaims } from "core/utils";

import { DefaultLayout } from "components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return getLayout(<Component {...pageProps} />);
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
