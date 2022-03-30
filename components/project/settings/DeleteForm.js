import PropTypes from "prop-types";

import { Form, InputWrap, Label, LabelHint } from "components/layout/Form";
import { DangerButton } from "components/layout/Button";

const DeleteForm = ({ onDelete }) => {
  return (
    <Form>
      <InputWrap>
        <Label>Delete project</Label>
        <LabelHint>
          Once you delete this project, there is no going back. Please be
          certain.
        </LabelHint>
      </InputWrap>
      <DangerButton style={{ width: "140px" }} onClick={onDelete}>
        Delete Project
      </DangerButton>
    </Form>
  );
};

DeleteForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteForm;
