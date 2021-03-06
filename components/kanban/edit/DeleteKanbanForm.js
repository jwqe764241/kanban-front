import PropTypes from "prop-types";

import { Form, InputWrap, Label, LabelHint } from "components/layout/Form";
import { DangerButton } from "components/layout/Button";

const DeleteKanbanForm = ({ name, onDelete }) => {
  const handleDeleteClick = () => {
    if (window.confirm("Sure you want to delete this kanban?")) {
      try {
        onDelete();
      } catch (e) {
        alert("Unknown error.");
      }
    }
  };

  return (
    <Form>
      <InputWrap>
        <Label>Delete {name}</Label>
        <LabelHint>
          Once you delete this kanban, there is no going back. Please be
          certain.
        </LabelHint>
      </InputWrap>
      <DangerButton style={{ width: "140px" }} onClick={handleDeleteClick}>
        Delete kanban
      </DangerButton>
    </Form>
  );
};

DeleteKanbanForm.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteKanbanForm;
