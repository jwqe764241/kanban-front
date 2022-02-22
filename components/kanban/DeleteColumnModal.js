import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { DangerButton, SecondaryButton } from "components/layout/Button";

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
        <div style={{ margin: "15px 0px" }}>
          <div style={{ fontSize: "14px", fontWeight: "300" }}>
            Are you sure you want to delete to delete this column?
          </div>
        </div>
        <DangerButton
          style={{ width: "110px", marginBottom: "15px", marginRight: "5px" }}
          onClick={onDeleteClick}
          disabled={isDeleting}
        >
          Delete column
        </DangerButton>
        <SecondaryButton
          style={{ width: "80px", marginBottom: "15px" }}
          onClick={close}
        >
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
