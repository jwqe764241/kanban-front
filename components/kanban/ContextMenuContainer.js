import { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ContextMenuPortal from "./ContextMenuPortal";
import ContextMenuContext from "./ContextMenuContext";

const Container = styled.div.attrs(({ position }) => ({
  style: {
    top: position ? `${position.y}px` : "0px",
    left: position ? `${position.x}px` : "0px",
  },
}))`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: rgb(100 100 111 / 25%) 0px 0px 20px 5px;
  width: 200px;
  z-index: 100;
`;

const ContextMenuContainer = ({ id, children }) => {
  const { isOpen, ref, menuPosition } = useContext(ContextMenuContext);

  if (!isOpen) {
    return <></>;
  }

  return (
    <ContextMenuPortal id={id}>
      <Container ref={ref} position={menuPosition}>
        {children}
      </Container>
    </ContextMenuPortal>
  );
};

ContextMenuContainer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ContextMenuContainer.defaultProps = {
  children: <></>,
};

export default ContextMenuContainer;
