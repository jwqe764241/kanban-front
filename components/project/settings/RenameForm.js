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

const RenameForm = ({ name, onRename }) => {
  const [data, setData] = useState({ name });
  const [errors, setErrors] = useState();

  const onChange = (e) => {
    const { target } = e;
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const onRenameClick = async () => {
    const response = await onRename(data);
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
          value={data.name}
          errors={errors}
          onChange={onChange}
        />
      </InputWrap>
      <SecondaryButton
        style={{ width: "100px" }}
        onClick={onRenameClick}
        disabled={!data.name || data.name === name}
      >
        Rename
      </SecondaryButton>
    </Form>
  );
};

RenameForm.propTypes = {
  name: PropTypes.string,
  onRename: PropTypes.func.isRequired,
};

RenameForm.defaultProps = {
  name: "",
};

export default RenameForm;
