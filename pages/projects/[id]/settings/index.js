import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios, { createRequester } from "core/apiAxios";
import { connect, useSelector, useDispatch } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import ProjectHeader from "components/project/ProjectHeader";
import { HorizontalRule, Title } from "components/layout/Page";
import Sidebar from "components/project/settings/Sidebar";
import RenameForm from "components/project/settings/RenameForm";
import UpdateDescriptionForm from "components/project/settings/UpdateDescriptionForm";
import DeleteForm from "components/project/settings/DeleteForm";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem 0;
  overflow-y: auto;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.darkgray70};
`;

const Settings = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);
  const [data, setData] = useState({
    name: project.name,
    description: project.description,
  });

  const handleNameChange = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleRename = async () => {
    const response = await requester.patch(
      `/projects/${id}/name`,
      { name: data.name },
      token,
    );
    if (response.status === 200) {
      // router.push(`/projects/${id}/kanbans`);
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
      `/projects/${id}/description`,
      { description: data.description },
      token,
    );
    if (response.status === 200) {
      // router.push(`/projects/${id}/kanbans`);
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Sure you want to delete this project?")) return;

    try {
      const response = await requester.delete(`/projects/${id}`, token);
      if (response.status === 200) {
        router.push(`/`);
      }
    } catch (e) {
      alert("Failed to delete project");
    }
  };

  return (
    <>
      <ProjectHeader project={project} />
      <Container>
        <Sidebar id={project.id} activeMenu="options" />
        <Wrap>
          <Title>Settings</Title>
          <HorizontalRule />
          <RenameForm
            name={data.name}
            onNameChange={handleNameChange}
            onRename={handleRename}
            disabled={!data.name || data.name === project.name}
          />
          <UpdateDescriptionForm
            description={data.description}
            onDescriptionChange={handleDescriptionChange}
            onDescriptionUpdate={handleDescriptionUpdate}
            disabled={data.description === project.description}
          />
          <HorizontalRule />
          <DeleteForm onDelete={onDelete} />
        </Wrap>
      </Container>
    </>
  );
};

Settings.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
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
      const projectResponse = await requester.get(`/projects/${id}`, token);
      return {
        props: {
          project: projectResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(Settings);
