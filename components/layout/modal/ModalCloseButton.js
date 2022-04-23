import styled from "styled-components";

import ClsoeIcon from "public/icons/close-lg.svg";
import { NoStyleButton } from "components/layout/Button";

const Button = styled(NoStyleButton)`
  width: 1em;
  height: 1em;
  padding: 0;
  float: right;
  font-size: 1em;
  color: currentColor;

  & > svg {
    display: block;
    fill: currentColor;
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
