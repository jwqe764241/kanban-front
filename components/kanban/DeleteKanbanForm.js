import styled from "styled-components";
import PropTypes from "prop-types";

import { InputWrap, Label, LabelHint } from "components/layout/Form";
import { DangerButton } from "components/layout/Button";

const DeleteKanbanForm = ({ name, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Sure you want to delete this kanban?")) {
      onDelete();
    }
  };

  return (
    <div>
      <InputWrap>
        <Label>Delete {name}</Label>
        <LabelHint>
          Once you delete this project, there is no going back. Please be
          certain.
        </LabelHint>
      </InputWrap>
      <DangerButton style={{ width: "140px" }} onClick={handleDelete}>
        Delete kanban
      </DangerButton>
    </div>
  );
};

DeleteKanbanForm.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteKanbanForm;
