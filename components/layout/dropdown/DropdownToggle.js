import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DropdownContext from "./DropdownContext";

const ToggleButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: currentColor;
  cursor: pointer;

  & > svg {
    fill: currentColor;
  }
`;

const DropdownToggle = ({ children }) => {
  const { setIsOpen } = useContext(DropdownContext);
  return (
    <ToggleButton
      onClick={() => {
        setIsOpen(true);
      }}
    >
      {children}
    </ToggleButton>
  );
};

DropdownToggle.propTypes = {
  children: PropTypes.node,
};

DropdownToggle.defaultProps = {
  children: <></>,
};

export default DropdownToggle;
