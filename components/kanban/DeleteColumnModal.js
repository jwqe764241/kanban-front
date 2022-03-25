import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { DangerButton, SecondaryButton } from "components/layout/Button";

const Message = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 300;
`;

const DeleteColumnModal = ({ show, setShow, taskColumn, onDelete }) => {
  const [isDeleting, setDeleting] = useState(false);

  const close = () => {
    setShow(false);
  };

  const onDeleteClick = async () => {
    setDeleting(true);
    await onDelete(taskColumn);
  };

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <Modal.Title>Delete {taskColumn.name}</Modal.Title>
        <Modal.CloseButton onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <Message>
          Are you sure you want to delete to delete this column?
        </Message>
        <DangerButton
          style={{ width: "120px", marginRight: "0.5rem" }}
          onClick={onDeleteClick}
          doing={isDeleting}
        >
          Delete column
        </DangerButton>
        <SecondaryButton style={{ width: "80px" }} onClick={close}>
          Cancel
        </SecondaryButton>
      </Modal.Body>
    </Modal>
  );
};

DeleteColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  taskColumn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    prevId: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteColumnModal;
