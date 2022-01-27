import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { InputWrap, Label, TextArea } from "components/layout/Form";
import { SuccessButton } from "components/layout/Button";

const Form = styled.div`
  margin-bottom: 30px;
`;

const UpdateDescriptionForm = ({ description, onUpdate }) => {
  const [data, setData] = useState({ description });
  const [errors, setErrors] = useState();

  const onChange = (e) => {
    const { target } = e;
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const onUpdateClick = async () => {
    const response = await onUpdate(data);
    const { status } = response;
    if (status === 400) {
      setErrors(response.data.data);
    }
  };

  return (
    <Form>
      <InputWrap>
        <Label block>Description</Label>
        <TextArea
          id="description"
          name="description"
          style={{ height: "100px" }}
          value={data.description}
          errors={errors}
          onChange={onChange}
        />
      </InputWrap>
      <SuccessButton
        style={{ width: "80px" }}
        onClick={onUpdateClick}
        disabled={data.description === description}
      >
        Update
      </SuccessButton>
    </Form>
  );
};

UpdateDescriptionForm.propTypes = {
  description: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

UpdateDescriptionForm.defaultProps = {
  description: "",
};

export default UpdateDescriptionForm;
