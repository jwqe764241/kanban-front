import { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SuccessButton, SecondaryButton } from "components/layout/Button";

const Background = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  width: 500px;
  margin: 10% auto;
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`;

const Modal = ({ show, setShow, children, innerRef }) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (show && innerRef.current && !innerRef.current.contains(e.target)) {
        setShow(false);
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
      <Container ref={innerRef}>{children}</Container>
    </Background>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  children: PropTypes.node,
  innerRef: PropTypes.object,
};

Modal.defaultProps = {
  children: <></>,
  innerRef: null,
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

const Buttons = styled.div`
  padding: 0px 20px 15px 20px;
  display: flex;
  justify-content: flex-end;
`;

const Alert = ({ show, setShow, title, message, innerRef }) => {
  return (
    <Modal show={show} setShow={setShow} innerRef={innerRef}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Buttons>
        <SecondaryButton
          style={{ width: "70px", marginRight: "10px" }}
          onClick={() => {
            setShow(false);
          }}
        >
          OK
        </SecondaryButton>
      </Buttons>
    </Modal>
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  innerRef: PropTypes.object,
};

Alert.defaultProps = {
  title: "",
  message: "",
  innerRef: null,
};

const Confirm = ({ show, setShow, title, message, onAccept, innerRef }) => {
  return (
    <Modal show={show} setShow={setShow} innerRef={innerRef}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Buttons>
        <SecondaryButton
          style={{ width: "80px", marginRight: "5px" }}
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </SecondaryButton>
        <SuccessButton style={{ width: "70px" }} onClick={onAccept}>
          OK
        </SuccessButton>
      </Buttons>
    </Modal>
  );
};

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  innerRef: PropTypes.object,
};

Confirm.defaultProps = {
  title: "",
  message: "",
  innerRef: null,
};

export { Modal, Title, Buttons, Alert, Confirm };
