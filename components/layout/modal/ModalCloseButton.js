import styled from "styled-components";

import ClsoeIcon from "public/icons/close.svg";

const Button = styled.button`
  width: 1em;
  height: 1em;
  padding: 0;
  float: right;
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & > svg {
    vertical-align: super;
  }
`;

const ModalCloseButton = ({ ...otherProps }) => {
  return (
    <Button type="button" {...otherProps}>
      <ClsoeIcon />
    </Button>
  );
};

export default ModalCloseButton;
