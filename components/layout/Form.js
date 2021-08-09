import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  line-height: 20px;
  outline: none;
  padding: 5px 12px;

  &:focus {
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    border-color: #868686;
  }
`;

export { Input };
