import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "core/apiAxios";

import Alert from "@material-ui/lab/Alert";

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

  &:disabled {
    background-color: #1d6a2f;
    border-color: #1d6a2f;
  }
`;

const AlertPanel = styled.div`
  margin: 15px 0px;
`;

function Home() {
  const [data, setData] = useState({ login: "", password: "" });
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoginProgressed, setIsLoginProgressed] = useState(false);

  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    setIsLoginProgressed(true);

    try {
      const response = await axios.post("/auth/login", data, {
        withCredentials: true,
      });
      if (response.status === 200) router.push("/dashboard");
    } catch (e) {
      setIsLoginFailed(true);
      console.log(e);
    }

    setIsLoginProgressed(false);
  };

  const { login, password } = data;

  return (
    <Panel>
      <Placeholder />
      <Form>
        <FormHeader>
          <HeaderText>Sign in</HeaderText>
        </FormHeader>
        {isLoginFailed ? (
          <AlertPanel>
            <Alert severity="error">Incorrect username or password.</Alert>
          </AlertPanel>
        ) : (
          <></>
        )}
        <FormBody>
          <Label htmlFor="login">Username</Label>
          <Input
            id="login"
            type="text"
            name="login"
            value={login}
            onChange={onChange}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          {isLoginProgressed ? (
            <Button
              type="button"
              value="Signing in..."
              onClick={handleLogin}
              disabled
            />
          ) : (
            <Button type="button" value="Sign in" onClick={handleLogin} />
          )}
        </FormBody>
      </Form>
    </Panel>
  );
}

export default Home;
