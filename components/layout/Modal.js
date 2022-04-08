import { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDetectOutsideClick from "components/hook/useDetectOutsideClick";

import ModalPortal from "./modal/ModalPortal";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalTitle from "./modal/ModalTitle";
import ModalCloseButton from "./modal/ModalCloseButton";

const Background = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 500px;
  margin: 10vh auto;
  color: ${({ theme }) => theme.colors.darkgray70};
  background-color: ${({ theme }) => theme.colors.darkgray20};
  border-radius: 2px;
`;

const Modal = ({ show, onClose, children }) => {
  const ref = useRef();
  useDetectOutsideClick(ref, show, onClose);

  if (!show) {
    return <></>;
  }

  return (
    <Background>
      <Container ref={ref}>{children}</Container>
    </Background>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: <></>,
};

Modal.Portal = ModalPortal;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;

export default Modal;
