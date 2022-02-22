import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { SuccessButton } from "components/layout/Button";
import { TextArea, Label } from "components/layout/Form";

const EditTaskModal = ({ show, setShow, task, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState({ text: task.text });
  const [errors, setErrors] = useState();

  const close = () => {
    setData({ text: task.text });
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
    const response = await onEdit(task, data);
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
        <Modal.Title>Edit task</Modal.Title>
        <Modal.CloseButton onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <div style={{ margin: "15px 0px" }}>
          <Label>Text</Label>
          <TextArea
            id="text"
            type="text"
            name="text"
            value={data.text}
            onChange={onChange}
            errors={errors}
            style={{ height: "200px" }}
            autoFocus
          />
        </div>
        <SuccessButton
          style={{ width: "110px", marginBottom: "15px" }}
          onClick={onEditClick}
          disabled={!data.text || isEditing}
        >
          Update task
        </SuccessButton>
      </Modal.Body>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    prevId: PropTypes.number,
    taskColumnId: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditTaskModal;
