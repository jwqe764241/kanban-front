import styled from "styled-components";
import PropTypes from "prop-types";

const HorizontalRule = styled.hr`
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #e1e4e8; ;
`;

const Label = styled.label`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const InputWrap = styled.div`
  margin-bottom: 25px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
  color: #ec0000;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  line-height: 20px;
  outline: none;
  padding: 5px 12px;
  background-color: #fafbfc;
  box-shadow: ${(props) =>
    props.error ? "#ff000080 0px 0px 0px 3px" : "none"};

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    border-color: #868686;
    background-color: #ffffff;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  line-height: 20px;
  outline: none;
  padding: 5px 12px;
  background-color: #fafbfc;
  box-shadow: ${(props) =>
    props.error ? "#ff000080 0px 0px 0px 3px" : "none"};
  resize: vertical;

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    border-color: #868686;
    background-color: #ffffff;
  }
`;

const Input = ({ errors, name, ...otherProps }) => {
  const error = errors ? errors[name] : null;
  return (
    <div>
      <StyledInput name={name} error={!!error} {...otherProps} />
      {error ? <ErrorMessage>{error.message}</ErrorMessage> : <></>}
    </div>
  );
};

Input.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string,
};

Input.defaultProps = {
  errors: undefined,
  name: undefined,
};

const TextArea = ({ errors, name, ...otherProps }) => {
  const error = errors ? errors[name] : null;
  return (
    <div>
      <StyledTextArea name={name} error={!!error} {...otherProps} />
      {error ? <ErrorMessage>{error.message}</ErrorMessage> : <></>}
    </div>
  );
};

TextArea.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string,
};

TextArea.defaultProps = {
  errors: undefined,
  name: undefined,
};

export { HorizontalRule, InputWrap, Label, Input, TextArea };
