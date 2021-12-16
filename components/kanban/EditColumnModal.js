import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "components/layout/Modal";
import { SuccessButton, NoStyleButton } from "components/layout/Button";
import { Input, Label } from "components/layout/Form";
import { RemoveIcon } from "components/layout/Icon";

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

const RemoveButton = ({ onClick }) => {
  return (
    <NoStyleButton
      style={{ float: "right", padding: 0 }}
      type="button"
      onClick={onClick}
    >
      <RemoveIcon style={{ verticalAlign: "baseline" }} />
    </NoStyleButton>
  );
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const EditColumnModal = ({ show, setShow, taskColumn, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState({ name: taskColumn.name });
  const [errors, setErrors] = useState();

  const close = () => {
    setData({ name: taskColumn.name });
    setShow(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onEditClick = async () => {
    setEditing(true);
    const response = await onEdit(taskColumn, data);
    setEditing(false);

    const { status } = response;
    if (status === 200) {
      setShow(false);
    } else if (status === 409) {
      setErrors({
        name: {
          message: "중복된 컬럼 이름입니다",
        },
      });
    } else if (status === 400) {
      setErrors(response.data.data);
    }
  };

  return (
    <Modal show={show} onClose={close}>
      <TitleContainer>
        <Title>Edit {taskColumn.name}</Title>
        <RemoveButton onClick={close} />
      </TitleContainer>
      <Container>
        <div style={{ margin: "15px 0px" }}>
          <Label htmlFor="name">Column name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            errors={errors}
            autoFocus
            placeholder="Enter column name (To do, In progress, Done)"
          />
        </div>
        <SuccessButton
          style={{ width: "110px", marginBottom: "15px" }}
          onClick={onEditClick}
          disabled={!data.name || isEditing}
        >
          Update column
        </SuccessButton>
      </Container>
    </Modal>
  );
};

EditColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  taskColumn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    prevId: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditColumnModal;
