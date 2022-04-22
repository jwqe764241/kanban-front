import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorIcon from "public/icons/exclamation.svg";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #ffeeee;

  & > div {
    padding: 0.5rem 0;
  }

  & svg {
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    fill: #f44336;
  }

  & span {
    font-size: 0.875rem;
    font-weight: 400;
  }
`;

const Wrap = styled.div`
  padding: 0.5rem 0;
`;

const IconWrap = styled(Wrap)`
  & > svg {
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    fill: #f44336;
  }
`;

const Message = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
`;

const Error = ({ children }) => {
  return (
    <Container>
      <IconWrap>
        <ErrorIcon />
      </IconWrap>
      <Wrap>
        <Message>{children}</Message>
      </Wrap>
    </Container>
  );
};

Error.propTypes = {
  children: PropTypes.node,
};

Error.defaultProps = {
  children: <></>,
};

export default Error;
