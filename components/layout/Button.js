import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 8px 0px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const PrimaryButton = styled(Button)`
  color: #fff;
  background-color: #2852a7;

  &:hover {
    color: #fff;
    background-color: #284b92;
  }

  &:disabled {
    background-color: #193266;
    cursor: default;
  }
`;

const SecondaryButton = styled(Button)`
  color: #fff;
  background-color: #6c757d;

  &:hover {
    color: #fff;
    background-color: #5a6268;
  }

  &:disabled {
    background-color: #3f4448;
    cursor: default;
  }
`;

const SuccessButton = styled(Button)`
  color: #fff;
  background-color: #28a745;

  &:hover {
    color: #fff;
    background-color: #218838;
  }

  &:disabled {
    background-color: #1d6a2f;
    cursor: default;
  }
`;

const DangerButton = styled(Button)`
  color: #fff;
  background-color: #dc3545;

  &:hover {
    color: #fff;
    background-color: #be3241;
  }

  &:disabled {
    background-color: #a82e3a;
    cursor: default;
  }
`;

const WarningButton = undefined;

const NoStyleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const RemoveButton = ({ style, onClick }) => {
  return (
    <NoStyleButton type="button" style={style} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </NoStyleButton>
  );
};

RemoveButton.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

RemoveButton.defaultProps = {
  style: {},
};

export {
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton,
  WarningButton,
  NoStyleButton,
  RemoveButton,
};
