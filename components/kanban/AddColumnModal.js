import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { SuccessButton } from "components/layout/Button";
import { Input, Label } from "components/layout/Form";

const AddColumnModal = ({ show, setShow, onCreate }) => {
  const [isCreating, setCreating] = useState(false);
  const [data, setData] = useState({ name: "" });
  const [errors, setErrors] = useState();

  const close = () => {
    setData({ name: "" });
    setShow(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onCreateClick = async () => {
    setCreating(true);
    const response = await onCreate(data);
    setCreating(false);

    const { status } = response;
    if (status === 201) {
      close();
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
        <Modal.Title>Add column</Modal.Title>
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
          onClick={onCreateClick}
          disabled={!data.name || isCreating}
        >
          Add column
        </SuccessButton>
      </Modal.Body>
    </Modal>
  );
};

AddColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default AddColumnModal;
