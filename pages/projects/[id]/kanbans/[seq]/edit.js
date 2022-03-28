import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import axios, { createRequester } from "core/apiAxios";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import KanbanHeader from "components/kanban/KanbanHeader";
import DeleteKanbanForm from "components/kanban/DeleteKanbanForm";
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

const EditKanban = ({ project, kanban }) => {
  const router = useRouter();
  const { id, seq } = router.query;
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isProgressed, setIsProgressed] = useState(false);
  const [data, setData] = useState({
    name: kanban.name,
    description: kanban.description,
  });
  const [errors, setErrors] = useState();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setIsProgressed(true);

    try {
      await requester.patch(`/projects/${id}/kanbans/${seq}`, data, token);
      router.push(`/projects/${id}/kanbans/${seq}`);
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

  const handleDelete = async () => {
    try {
      await requester.delete(`/projects/${id}/kanbans/${seq}`, token);
      router.push(`/projects/${id}/kanbans`);
    } catch (e) {
      alert("Unknown error.");
    }
  };

  return (
    <>
      <KanbanHeader project={project} kanban={kanban} />
      <Container>
        <Wrap>
          <Title>{`Edit ${kanban.name}`}</Title>
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
              onClick={handleUpdate}
              disabled={!data.name}
              doing={isProgressed}
            >
              {isProgressed ? "Saving..." : "Save kanban"}
            </SuccessButton>
          </Form>
          <HorizontalRule />
          <Form>
            <DeleteKanbanForm name={kanban.name} onDelete={handleDelete} />
          </Form>
        </Wrap>
      </Container>
    </>
  );
};

EditKanban.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  kanban: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    sequenceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id, seq } = context.query;
    const cookies = parseCookie(context.req.headers.cookie);
    const requester = createRequester(
      axios,
      store.dispatch,
      cookies.REFRESH_TOKEN,
    );

    const { token } = store.getState();
    try {
      const projectResponse = await requester.get(`/projects/${id}`, token);
      const kanbanResponse = await requester.get(
        `/projects/${id}/kanbans/${seq}`,
        token,
      );
      return {
        props: {
          project: projectResponse.data,
          kanban: kanbanResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(EditKanban);
