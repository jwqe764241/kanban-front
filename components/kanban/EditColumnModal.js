import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { SuccessButton } from "components/layout/Button";
import { Input, Label } from "components/layout/Form";

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
      <Modal.Header>
        <Modal.Title>Edit {taskColumn.name}</Modal.Title>
        <Modal.CloseButton onClick={close} />
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
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
