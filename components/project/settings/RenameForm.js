import { useState } from "react";
import PropTypes from "prop-types";

import { InputWrap, Label, Input } from "components/layout/Form";
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
    <InputWrap>
      <Label block>Name</Label>
      <Input
        id="name"
        type="text"
        name="name"
        style={{ width: "250px" }}
        value={data.name}
        errors={errors}
        onChange={onChange}
      />
      <SecondaryButton
        style={{ width: "80px", marginLeft: "10px" }}
        onClick={onRenameClick}
        disabled={!data.name || data.name === name}
      >
        Rename
      </SecondaryButton>
    </InputWrap>
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
