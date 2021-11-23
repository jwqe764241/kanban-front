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

const CancelButton = styled(Button)`
  color: #24292f;
  background-color: #f6f8fa;
  border: 1px solid #1b1f2426;
  font-weight: 500;

  &:hover {
    background-color: #f3f4f6;
  }

  &:disabled {
    background-color: #eaebeb;
    cursor: default;
  }
`;

const NoStyleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export {
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton,
  WarningButton,
  CancelButton,
  NoStyleButton,
};
