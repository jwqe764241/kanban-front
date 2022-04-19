import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "components/GlobalStyle";
import theme from "components/theme";
import Navbar from "components/layout/Navbar";
import { Children } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const NoStyleLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {children}
        <div id="modal-root" />
      </ThemeProvider>
    </>
  );
};

export const DefaultLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main>
          <Navbar />
          {children}
        </Main>
        <div id="modal-root" />
      </ThemeProvider>
    </>
  );
};
