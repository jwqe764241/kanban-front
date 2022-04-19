import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import axios, { createRequester } from "core/apiAxios";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import KanbanHeader from "components/kanban/KanbanHeader";
import RenameForm from "components/kanban/edit/RenameForm";
import UpdateDescriptionForm from "components/kanban/edit/UpdateDescriptionForm";
import DeleteKanbanForm from "components/kanban/edit/DeleteKanbanForm";
import { HorizontalRule, Title } from "components/layout/Page";

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
  const [data, setData] = useState({
    name: kanban.name,
    description: kanban.description,
  });

  const handleNameChange = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleRename = async () => {
    const response = await requester.patch(
      `/projects/${id}/kanbans/${seq}/name`,
      { name: data.name },
      token,
    );
    if (response.status === 200) {
      router.reload();
    }
  };

  const handleDescriptionChange = (e) => {
    setData({
      ...data,
      description: e.target.value,
    });
  };

  const handleDescriptionUpdate = async () => {
    const response = await requester.patch(
      `/projects/${id}/kanbans/${seq}/description`,
      { description: data.description },
      token,
    );
    if (response.status === 200) {
      router.reload();
    }
  };

  const handleDelete = async () => {
    const response = await requester.delete(
      `/projects/${id}/kanbans/${seq}`,
      token,
    );
    if (response.status === 200) {
      router.push(`/projects/${id}/kanbans`);
    }
  };

  return (
    <>
      <KanbanHeader project={project} kanban={kanban} />
      <Container>
        <Wrap>
          <Title>{`Edit ${kanban.name}`}</Title>
          <HorizontalRule />
          <RenameForm
            name={data.name}
            onNameChange={handleNameChange}
            onRename={handleRename}
            disabled={!data.name || data.name === kanban.name}
          />
          <UpdateDescriptionForm
            description={data.description}
            onDescriptionChange={handleDescriptionChange}
            onDescriptionUpdate={handleDescriptionUpdate}
            disabled={data.description === kanban.description}
          />
          <HorizontalRule />
          <DeleteKanbanForm name={kanban.name} onDelete={handleDelete} />
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
