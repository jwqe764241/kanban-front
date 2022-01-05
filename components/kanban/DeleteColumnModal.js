import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "components/layout/Modal";
import {
  DangerButton,
  SecondaryButton,
  RemoveButton,
} from "components/layout/Button";

const TitleContainer = styled.div`
  padding: 20px 15px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  border-radius: 6px 6px 0px 0px;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #24292f;
`;

const Container = styled.div`
  padding: 0px 15px;
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
      <TitleContainer>
        <Title>Delete {taskColumn.name}</Title>
        <RemoveButton style={{ float: "right", padding: 0 }} onClick={close} />
      </TitleContainer>
      <Container>
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
      </Container>
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
