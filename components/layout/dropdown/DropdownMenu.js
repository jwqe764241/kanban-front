import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DropdownContext from "./DropdownContext";

const Container = styled.div`
  ${({ open }) => (!open ? "display: none" : "")};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: #dcdcdc 0px 0px 20px 5px;
  width: 200px;

  z-index: 100;

  top: -170px;
  left: 50px;
`;

const DropdownMenu = ({ children }) => {
  const { isOpen, ref } = useContext(DropdownContext);
  return (
    <Container open={isOpen} ref={ref}>
      {children}
    </Container>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node,
};

DropdownMenu.defaultProps = {
  children: <></>,
};

export default DropdownMenu;
