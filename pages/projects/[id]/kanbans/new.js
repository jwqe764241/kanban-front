import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
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
import ProjectHeader from "components/project/ProjectHeader";
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

const NewKanban = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
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
      const response = await requester.post(
        `/projects/${id}/kanbans`,
        data,
        token,
      );
      if (response.status === 201) {
        const { projectId, sequenceId } = response.data;
        router.push(`/projects/${projectId}/kanbans/${sequenceId}`);
      }
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 400) {
        setErrors(errorResponse.data.data);
      } else if (errorResponse.status === 403) {
        alert("Use hanve no permission to do this.");
      } else {
        alert("Unknown error.");
      }
    }

    setIsProgressed(false);
  };

  return (
    <>
      <ProjectHeader project={project} />
      <Container>
        <Wrap>
          <Title>New kanban</Title>
          <Description>Create a new kanban.</Description>
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
              <LabelHint>
                Must be less than or equal to 200 characters
              </LabelHint>
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
              {isProgressed ? "Creating" : "Create kanban"}
            </SuccessButton>
          </Form>
        </Wrap>
      </Container>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;
    const cookies = parseCookie(context.req.headers.cookie);
    const requester = createRequester(
      axios,
      store.dispatch,
      cookies.REFRESH_TOKEN,
    );

    const { token } = store.getState();

    try {
      const response = await requester.get(`/projects/${id}`, token);
      return {
        props: {
          project: response.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default NewKanban;
