import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  line-height: 20px;
  outline: none;
  padding: 5px 12px;
  background-color: #fafbfc;

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    border-color: #868686;
    background-color: #ffffff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  line-height: 20px;
  outline: none;
  padding: 5px 12px;
  background-color: #fafbfc;

  &:focus {
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    border-color: #868686;
    background-color: #ffffff;
  }
`;

const InputWrap = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

export { Input, TextArea, InputWrap, Label };
