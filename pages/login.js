import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "core/apiAxios";
import { parseCookie } from "core/utils";

import Alert from "@material-ui/lab/Alert";

import { SuccessButton } from "components/layout/Button";

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

const AlertPanel = styled.div`
  margin: 15px 0px;
`;

function Login() {
  const [data, setData] = useState({ login: "", password: "" });
  const [isLoginFailed, setIsLoginFailed] = useState({
    status: false,
    message: "",
  });
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

      if (response.status === 200) {
        axios.defaults.headers.common.Authorization = `Bearer ${response.data}`;
        router.push("/");
      }
    } catch (e) {
      if (e.code === "ECONNABORTED") {
        setIsLoginFailed({
          status: true,
          message: "Server is bussy, try again later.",
        });
      } else if (e.response && e.response.status === 401) {
        setIsLoginFailed({
          status: true,
          message: "Incorrect username or password.",
        });
      }
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
        {isLoginFailed.status ? (
          <AlertPanel>
            <Alert severity="error">{isLoginFailed.message}</Alert>
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
            <SuccessButton type="button" onClick={handleLogin} disabled>
              Signing in...
            </SuccessButton>
          ) : (
            <SuccessButton type="button" onClick={handleLogin}>
              Sign in
            </SuccessButton>
          )}
        </FormBody>
      </Form>
    </Panel>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookie(context.req.headers.cookie);
  const refreshCookie = cookies.REFRESH_TOKEN;
  if (!refreshCookie) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default Login;
