import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DropdownContext from "./DropdownContext";

const Container = styled.div.attrs(({ position, show }) => ({
  style: {
    top: position ? position.top : 0,
    right: position ? position.right : 0,
    bottom: position ? position.bottom : 0,
    left: position ? position.left : 0,
    display: show ? "" : "none",
  },
}))`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: rgb(100 100 111 / 25%) 0px 0px 20px 5px;
  width: 200px;
  z-index: 100;
`;

const DropdownMenu = ({ position, children }) => {
  const { isOpen, ref } = useContext(DropdownContext);
  return (
    <Container show={isOpen} position={position} ref={ref}>
      {children}
    </Container>
  );
};

DropdownMenu.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
  children: PropTypes.node,
};

DropdownMenu.defaultProps = {
  position: null,
  children: <></>,
};

export default DropdownMenu;
