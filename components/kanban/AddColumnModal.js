import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "components/layout/Modal";
import { SuccessButton, RemoveButton } from "components/layout/Button";
import { Input, Label } from "components/layout/Form";

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

const AddColumnModal = ({ show, setShow, innerRef, onCreate }) => {
  const [isCreating, setCreating] = useState(false);
  const [data, setData] = useState({ name: "" });
  const [errors, setErrors] = useState();

  const closeModal = () => {
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

    if (response.status === 409) {
      setErrors({
        name: {
          message: "중복된 컬럼 이름입니다",
        },
      });
    } else if (response.status === 400) {
      setErrors(response.data.data);
    }
  };

  return (
    <Modal show={show} setShow={setShow} innerRef={innerRef}>
      <TitleContainer>
        <Title>Add column</Title>
        <RemoveButton style={{ float: "right" }} onClick={closeModal} />
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
          onClick={onCreateClick}
          disabled={!data.name || isCreating}
        >
          Add column
        </SuccessButton>
      </Container>
    </Modal>
  );
};

AddColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default AddColumnModal;
