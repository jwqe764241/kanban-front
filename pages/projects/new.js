import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch } from "react-redux";

import {
  Form,
  InputWrap,
  Label,
  LabelHint,
  Input,
  TextArea,
} from "components/layout/Form";
import { HorizontalRule, Title, Description } from "components/layout/Page";
import { SuccessButton } from "components/layout/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  overflow-y: auto;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.darkgray70};
`;

const New = () => {
  const router = useRouter();
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isProgressed, setIsProgressed] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    setIsProgressed(true);

    try {
      const response = await requester.post("/projects", data, token);
      if (response.status === 201) {
        router.push("/projects");
      }
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 400) {
        setErrors(errorResponse.data.data);
      } else if (errorResponse.status === 409) {
        alert("Project name already exist, please use another name");
      } else {
        alert("Unknown error.");
      }
    }

    setIsProgressed(false);
  };

  return (
    <Container>
      <Wrap>
        <Title>New Project</Title>
        <Description>Create a new project.</Description>
        <HorizontalRule />
        <Form>
          <InputWrap>
            <Label block required>
              Name
            </Label>
            <LabelHint>Must be between 2-50 characters</LabelHint>
            <Input
              id="name"
              type="text"
              name="name"
              style={{ width: "300px" }}
              value={data.name}
              onChange={onChange}
              errors={errors}
            />
          </InputWrap>
          <InputWrap>
            <Label block>Description</Label>
            <LabelHint>Must be less than or equal to 200 characters</LabelHint>
            <TextArea
              id="description"
              name="description"
              style={{ height: "100px" }}
              value={data.description}
              onChange={onChange}
              errors={errors}
            />
          </InputWrap>
          <SuccessButton
            type="button"
            style={{ width: "140px" }}
            onClick={handleCreate}
            disabled={!data.name}
            doing={isProgressed}
          >
            {isProgressed ? "Creating..." : "Create project"}
          </SuccessButton>
        </Form>
      </Wrap>
    </Container>
  );
};

export default New;
