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

const SecondaryButton = undefined;

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

const DangerButton = undefined;

const WarningButton = undefined;

export {
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton,
  WarningButton,
};
