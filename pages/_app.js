/* eslint-disable */
import "styles/reset.css";
import "styles/global.css";
import App from "next/app";
import styled from "styled-components";
import Navbar from "components/layout/Navbar";
import { Component } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const excludePath = new Set([
  "/",
  "/_error"
])

function MyApp({ Component, pageProps }) {
  const pathname = pageProps && pageProps.pathname;
  return excludePath.has(pathname) ? (
    <>
      <Component {...pageProps} />
    </>
  ) : (
    <>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const {ctx, Component} = appContext;
  let pageProps = {};

  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps : {...pageProps, pathname: ctx.pathname} };
}

export default MyApp;
