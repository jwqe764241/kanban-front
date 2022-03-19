import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 0.5em 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  user-select: none;
`;

export const PrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.action};

  &:hover {
    background-color: ${({ theme }) => theme.colors.actionHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.actionDisable};
    cursor: default;
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.gray10};
  border: 1px solid ${({ theme }) => theme.colors.gray20};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
  }

  &:disabled {
    background-color: #3f4448;
    cursor: default;
  }
`;

export const SuccessButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.success};

  &:hover {
    background-color: ${({ theme }) => theme.colors.successHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.successDisable};
    cursor: default;
  }
`;

export const DangerButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.error};

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.errorDisable};
    cursor: default;
  }
`;

export const WarningButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.warning};

  &:hover {
    background-color: ${({ theme }) => theme.colors.warningHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.warningDisable};
    cursor: default;
  }
`;

export const NoStyleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const RemoveButton = ({ ...otherProps }) => {
  return (
    <NoStyleButton type="button" {...otherProps}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        style={{ verticalAlign: "baseline" }}
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </NoStyleButton>
  );
};
