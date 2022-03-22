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
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Optional = styled.span`
  color: #57606a;
  font-size: 12px;
`;

const InputWrap = styled.div`
  margin-bottom: 25px;
`;

const Form = styled.div`
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 2px;
  outline: none;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.darkgray30};
  box-shadow: ${({ error, theme }) =>
    error ? `${theme.colors.error} 0px 0px 0px 2px` : "none"};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 2px;
  outline: none;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.darkgray30};
  box-shadow: ${({ error, theme }) =>
    error ? `${theme.colors.error} 0px 0px 0px 2px` : "none"};
  resize: vertical;
`;

const Input = ({ errors, name, ...otherProps }) => {
  const error = errors ? errors[name] : null;
  return (
    <span>
      <StyledInput name={name} error={!!error} {...otherProps} />
      {error ? <ErrorMessage>{error.message}</ErrorMessage> : <></>}
    </span>
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

export { HorizontalRule, InputWrap, Form, Label, Optional, Input, TextArea };
