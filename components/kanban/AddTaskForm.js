import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { TextArea } from "components/layout/Form";
import { SuccessButton, CancelButton } from "components/layout/Button";

const Container = styled.div`
  padding: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 8px;

  & > button:first-child {
    margin-right: 4px;
  }

  & > button:last-child {
    margin-left: 4px;
  }
`;

const AddTaskForm = ({ onAddTask, setShow }) => {
  const [data, setData] = useState({ text: "" });
  const [isCreating, setCreating] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onAddButtonClick = async () => {
    setCreating(true);
    const response = await onAddTask(data);
    setCreating(false);

    if (response.status === 201) {
      setShow(false);
    }
  };

  const onCancelButtonClick = () => {
    setShow(false);
  };

  return (
    <Container>
      <TextArea
        id="text"
        type="text"
        name="text"
        value={data.text}
        onChange={onChange}
        autoFocus
        placeholder="Enter a task"
      />
      <ButtonContainer>
        <SuccessButton
          onClick={onAddButtonClick}
          disabled={!data.text || isCreating}
        >
          Add
        </SuccessButton>
        <CancelButton onClick={onCancelButtonClick}>Cancel</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default AddTaskForm;
