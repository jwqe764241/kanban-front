import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SuccessButton, SecondaryButton } from "components/layout/Button";

const ModalPortal = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    const modalRoot = document.getElementById("modal-root");
    return ReactDOM.createPortal(children, modalRoot);
  }

  return null;
};

const Background = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  width: 500px;
  margin: 10vh auto;
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`;

const Modal = ({ show, onClose, children }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [show]);

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

const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #d0d7de;
  border-radius: 6px 6px 0px 0px;
  background-color: #fafbfc;
  font-size: 18px;
  font-weight: 600;
`;

const Message = styled.div`
  padding: 20px;
  font-size: 16px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  padding: 0px 20px 15px 20px;
  display: flex;
  justify-content: flex-end;
`;

const Alert = ({ show, setShow, title, message }) => {
  const close = () => {
    setShow(false);
  };
  return (
    <Modal show={show} onClose={close}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ButtonContainer>
        <SecondaryButton
          style={{ width: "70px", marginRight: "10px" }}
          onClick={close}
        >
          OK
        </SecondaryButton>
      </ButtonContainer>
    </Modal>
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

Alert.defaultProps = {
  title: "",
  message: "",
};

const Confirm = ({ show, setShow, title, message, onAccept }) => {
  const close = () => {
    setShow(false);
  };
  return (
    <Modal show={show} onClose={close}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ButtonContainer>
        <SecondaryButton
          style={{ width: "80px", marginRight: "5px" }}
          onClick={close}
        >
          Cancel
        </SecondaryButton>
        <SuccessButton style={{ width: "70px" }} onClick={onAccept}>
          OK
        </SuccessButton>
      </ButtonContainer>
    </Modal>
  );
};

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  title: "",
  message: "",
};

export { ModalPortal, Modal, Title, Alert, Confirm };
