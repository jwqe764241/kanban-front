import { useState } from "react";
import PropTypes from "prop-types";

import {
  Form,
  InputWrap,
  Label,
  LabelHint,
  TextArea,
} from "components/layout/Form";
import { SuccessButton } from "components/layout/Button";

const UpdateDescriptionForm = ({
  description,
  onDescriptionChange,
  onDescriptionUpdate,
  disabled,
}) => {
  const [errors, setErrors] = useState();

  const handleUpdateClick = async () => {
    try {
      await onDescriptionUpdate();
    } catch (e) {
      const { response } = e;
      const { status } = response;
      if (status === 400) {
        setErrors(response.data.data);
      }
    }
  };

  return (
    <Form>
      <InputWrap>
        <Label block>Description</Label>
        <LabelHint>Must be less than or equal to 200 characters</LabelHint>
        <TextArea
          id="description"
          name="description"
          style={{ height: "100px" }}
          value={description}
          errors={errors}
          onChange={onDescriptionChange}
        />
      </InputWrap>
      <SuccessButton
        style={{ width: "100px" }}
        onClick={handleUpdateClick}
        disabled={disabled}
      >
        Update
      </SuccessButton>
    </Form>
  );
};

UpdateDescriptionForm.propTypes = {
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func.isRequired,
  onDescriptionUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

UpdateDescriptionForm.defaultProps = {
  description: "",
  disabled: false,
};

export default UpdateDescriptionForm;
