import { useState } from "react";
import PropTypes from "prop-types";

import {
  Form,
  InputWrap,
  Label,
  LabelHint,
  Input,
} from "components/layout/Form";
import { SecondaryButton } from "components/layout/Button";

const RenameForm = ({ name, onNameChange, onRename, disabled }) => {
  const [errors, setErrors] = useState();

  const handleRenameClick = async () => {
    const response = await onRename();
    const { status } = response;
    if (status === 400) {
      setErrors(response.data.data);
    }
  };

  return (
    <Form>
      <InputWrap>
        <Label block>Name</Label>
        <LabelHint>Must be between 2-50 characters</LabelHint>
        <Input
          id="name"
          type="text"
          name="name"
          style={{ width: "300px" }}
          value={name}
          errors={errors}
          onChange={onNameChange}
        />
      </InputWrap>
      <SecondaryButton
        style={{ width: "100px" }}
        onClick={handleRenameClick}
        disabled={disabled}
      >
        Rename
      </SecondaryButton>
    </Form>
  );
};

RenameForm.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

RenameForm.defaultProps = {
  name: "",
  disabled: false,
};

export default RenameForm;
