import styled from "styled-components";

const DropdownItem = styled.button`
  width: 100%;
  padding: 1em 1.5em;
  border: none;
  color: ${({ theme }) => theme.colors.cadetBlueCrayola};
  background-color: transparent;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  transition: color 0.1s ease;
  transition: background-color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.unitedNationsBlue};
  }

  &:first-child {
    border-radius: 4px 4px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 4px 4px;
  }

  & > svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    margin-right: 0.5em;
  }
`;

export default DropdownItem;
