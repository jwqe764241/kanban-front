import PropTypes from "prop-types";
import axios, { createRequester } from "core/apiAxios";
import { connect, useSelector, useDispatch } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import ProjectHeader from "components/project/ProjectHeader";
import { ContainerXL } from "components/layout/Container";
import { Layout, Body, Title } from "components/project/settings/Layout";
import Sidebar from "components/project/settings/Sidebar";
import InviteMemberForm from "components/project/settings/InviteMemberForm";

const InvitationSettings = ({ project, invitations }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const onSuggest = async (value) => {
    try {
      const response = await requester.get(
        `/projects/${project.id}/members/suggestions?q=${value}`,
        token,
      );
      return response.data;
    } catch (e) {
      return [];
    }
  };

  const onInvite = async (user) => {
    let response;
    try {
      response = await requester.post(
        `/projects/${project.id}/invitations`,
        { userId: user.id },
        token,
      );
    } catch (e) {
      response = e.response;
    }
    return response;
  };

  const onRemove = async (userId) => {
    let response;
    try {
      response = await requester.delete(
        `/projects/${project.id}/invitations/${userId}`,
        token,
      );
    } catch (e) {
      response = e.response;
    }
    return response;
  };

  return (
    <>
      <ProjectHeader project={project} activeMenu="settings" />
      <ContainerXL>
        <Layout>
          <Sidebar id={project.id} activeMenu="invitations" />
          <Body>
            <Title>Invitations</Title>
            <InviteMemberForm
              invitations={invitations}
              onSuggest={onSuggest}
              onInvite={onInvite}
              onRemove={onRemove}
            />
          </Body>
        </Layout>
      </ContainerXL>
    </>
  );
};

InvitationSettings.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  invitations: PropTypes.arrayOf(PropTypes.object),
};

InvitationSettings.defaultProps = {
  invitations: [],
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
      const [projectResponse, invitationResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/invitations`, token),
      ]);
      return {
        props: {
          project: projectResponse.data,
          invitations: invitationResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(InvitationSettings);
