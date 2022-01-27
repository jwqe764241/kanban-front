import PropTypes from "prop-types";
import { useRouter } from "next/router";
import axios, { createRequester } from "core/apiAxios";
import { connect, useSelector, useDispatch } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import ProjectHeader from "components/project/ProjectHeader";
import { ContainerXL } from "components/layout/Container";
import { Layout, Body, Title } from "components/project/settings/Layout";
import Sidebar from "components/project/settings/Sidebar";
import RenameForm from "components/project/settings/RenameForm";
import UpdateDescriptionForm from "components/project/settings/UpdateDescriptionForm";
import DeleteForm from "components/project/settings/DeleteForm";

const Settings = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const onRename = async (data) => {
    try {
      const response = await requester.patch(
        `/projects/${id}/name`,
        data,
        token,
      );
      if (response.status === 200) {
        router.push(`/projects/${id}/kanbans`);
      }
      return response;
    } catch (e) {
      return e;
    }
  };

  const onUpdateDescription = async (data) => {
    try {
      const response = await requester.patch(
        `/projects/${id}/description`,
        data,
        token,
      );
      return response;
    } catch (e) {
      return e;
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
      <ProjectHeader project={project} activeMenu="settings" />
      <ContainerXL>
        <Layout>
          <Sidebar id={project.id} activeMenu="options" />
          <Body>
            <Title>Settings</Title>
            <RenameForm name={project.name} onRename={onRename} />
            <UpdateDescriptionForm
              description={project.description}
              onUpdate={onUpdateDescription}
            />
            <DeleteForm onDelete={onDelete} />
          </Body>
        </Layout>
      </ContainerXL>
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
