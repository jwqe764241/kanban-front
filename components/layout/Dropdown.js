import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDetectOutsideClick from "components/hook/useDetectOutsideClick";
import useDetectRouteChange from "components/hook/useDetectRouteChange";

import DropdownContext from "./dropdown/DropdownContext";
import DropdownToggle from "./dropdown/DropdownToggle";
import DropdownMenu from "./dropdown/DropdownMenu";
import DropdownItem from "./dropdown/DropdownItem";

const Container = styled.div`
  position: relative;
`;

const Dropdown = ({ children }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useDetectOutsideClick(ref, isOpen, closeDropdown); // close dropdown menu when user clicked outside
  useDetectRouteChange(isOpen, closeDropdown); // close dropdown menu when route changed

  const contextValue = {
    isOpen,
    setIsOpen,
    ref,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <Container>{children}</Container>
    </DropdownContext.Provider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
};

Dropdown.defaultProps = {
  children: <></>,
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;

export default Dropdown;
