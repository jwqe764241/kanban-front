import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DropdownContext from "./DropdownContext";

const ToggleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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
