import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "core/apiAxios";
import { parseCookie } from "core/utils";
import { useDispatch } from "react-redux";

import Alert from "@material-ui/lab/Alert";

import { Input, InputWrap } from "components/layout/Form";
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

const AlertPanel = styled.div`
  margin: 15px 0px;
`;

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState({ login: "", password: "" });
  const [isLoginFailed, setIsLoginFailed] = useState({
    status: false,
    message: "",
  });
  const [isLoginProgressed, setIsLoginProgressed] = useState(false);

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
        const { token } = response.data;
        dispatch({ type: "UPDATE_TOKEN", payload: `${token}` });
        router.push("/");
      }
    } catch (e) {
      let message = "Unknown error. try again later.";

      if (e.code === "ECONNABORTED") {
        message = "Server is bussy, try again later.";
      } else if (e.message === "Network Error") {
        message = "Server is not responded, try again later.";
      } else if (e.response && e.response.status === 401) {
        message = "Incorrect username or password.";
      }

      setIsLoginFailed({ status: true, message });
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
          <InputWrap style={{ marginBottom: "15px" }}>
            <Label htmlFor="login">Username</Label>
            <Input
              id="login"
              type="text"
              name="login"
              value={login}
              onChange={onChange}
            />
          </InputWrap>
          <InputWrap style={{ marginBottom: "25px" }}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </InputWrap>
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
};

export const getServerSideProps = async (context) => {
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
};

export default Login;
