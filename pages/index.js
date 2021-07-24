import styled from "styled-components";

const Placeholder = styled.div`
  height: 100px;
`;

const Panel = styled.div`
  height: 100vh !important;
  background-color: #f9f9f9;
  color: #333333;
`;

const Form = styled.div`
  width: 350px;
  margin: 0 auto;
  padding: 20px;
`;

const FormHeader = styled.div`
  margin-bottom: 25px;
`;

const HeaderText = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const FormBody = styled.div`
  padding: 30px 20px;
  border: 1px solid;
  border-color: rgb(216, 222, 226);
  border-radius: 6px;
  background-color: white;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;

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

const Button = styled.input`
  width: 100%;
  padding: 8px 0px;
  margin-top: 10px;
  color: #fff;
  background-color: #28a745;
  border: 1px solid;
  border-radius: 6px;
  border-color: #28a745;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

function Home() {
  return (
    <Panel>
      <Placeholder />
      <Form>
        <FormHeader>
          <HeaderText>Sign in</HeaderText>
        </FormHeader>
        <FormBody>
          <Label>Username</Label>
          <Input />
          <Label>Password</Label>
          <Input type="password" />
          <Button type="button" value="Sign in" />
        </FormBody>
      </Form>
    </Panel>
  );
}

export default Home;
