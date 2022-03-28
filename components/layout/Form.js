import styled, { css } from "styled-components";
import PropTypes from "prop-types";

export const Label = styled.label`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkgray70};

  ${({ required, theme }) =>
    required &&
    css`
      &::after {
        color: ${theme.colors.error};
        content: "*";
        padding-left: 3px;
      }
    `};
`;

export const LabelHint = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.darkgray50};
`;

export const InputWrap = styled.div`
  margin-bottom: 1.5rem;
`;

export const Form = styled.div`
  padding: 1.5rem 0;
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

  &:focus {
    box-shadow: ${({ theme }) => `${theme.colors.darkgray60} 0px 0px 0px 2px`};
  }
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

  &:focus {
    box-shadow: ${({ theme }) => `${theme.colors.darkgray60} 0px 0px 0px 2px`};
  }
`;

export const Input = ({ errors, name, ...otherProps }) => {
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

export const TextArea = ({ errors, name, ...otherProps }) => {
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
