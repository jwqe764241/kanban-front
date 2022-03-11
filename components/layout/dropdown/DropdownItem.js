import styled from "styled-components";

const DropdownItem = styled.button`
  width: 100%;
  display: block;
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
    background-color: ${({ theme }) => theme.colors.aaa};
  }

  &:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  &:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  & > svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    margin-right: 0.5em;
  }
`;

export default DropdownItem;
