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

const Settings = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const onRename = async (data) => {
    try {
      const response = await requester.patch(`/projects/${id}`, data, token);
      if (response.status === 200) {
        router.push(`/projects/${id}/kanbans`);
      }
      return response;
    } catch (e) {
      return e;
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
