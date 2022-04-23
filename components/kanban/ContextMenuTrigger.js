import { useState, useRef } from "react";
import PropTypes from "prop-types";
import useDetectOutsideClick from "components/hook/useDetectOutsideClick";
import useDetectRouteChange from "components/hook/useDetectRouteChange";

import ContextMenuContext from "./ContextMenuContext";

const ContextMenuTrigger = ({ children }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const closeContextMenu = () => setIsOpen(false);
  useDetectOutsideClick(ref, isOpen, closeContextMenu); // close dropdown menu when user clicked outside
  useDetectRouteChange(isOpen, closeContextMenu); // close dropdown menu when route changed

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setIsOpen(true);
  };

  const contextValue = {
    isOpen,
    ref,
    menuPosition,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <span onContextMenu={onContextMenu}>{children}</span>
    </ContextMenuContext.Provider>
  );
};

ContextMenuTrigger.propTypes = {
  children: PropTypes.node,
};

ContextMenuTrigger.defaultProps = {
  children: <></>,
};

export default ContextMenuTrigger;
