import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import GlobalStyle from "components/GlobalStyle";
import theme from "components/Theme";
import Navbar from "components/layout/Navbar";

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

NoStyleLayout.propTypes = {
  children: PropTypes.node,
};

NoStyleLayout.defaultProps = {
  children: <></>,
};

export const DefaultLayout = ({ kanban, children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main>
          <Navbar kanban={kanban} />
          {children}
        </Main>
        <div id="modal-root" />
      </ThemeProvider>
    </>
  );
};

DefaultLayout.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  children: PropTypes.node,
};

DefaultLayout.defaultProps = {
  kanban: null,
  children: <></>,
};
