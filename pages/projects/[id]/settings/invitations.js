import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios, { createRequester } from "core/apiAxios";
import { connect, useSelector, useDispatch } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import ProjectHeader from "components/project/ProjectHeader";
import { HorizontalRule, Title } from "components/layout/Page";
import Sidebar from "components/project/settings/Sidebar";
import InviteMemberForm from "components/project/settings/InviteMemberForm";
import MemberList from "components/project/settings/MemberList";

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

const InvitationSettings = ({ project, invitations }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);
  const [invitationList, setInvitationList] = useState([...invitations]);

  const handleSuggest = async (value) => {
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

  const handleInvite = async (user) => {
    const response = await requester.post(
      `/projects/${project.id}/invitations`,
      { userId: user.id },
      token,
    );

    if (response.status === 200) {
      setInvitationList((oldArray) => [...oldArray, response.data]);
    }
  };

  const handleRemove = async (userId) => {
    const response = await requester.delete(
      `/projects/${project.id}/invitations/${userId}`,
      token,
    );

    if (response.status === 200) {
      const index = invitationList.findIndex((user) => user.id === userId);
      if (index !== -1) {
        invitationList.splice(index, 1);
        setInvitationList([...invitationList]);
      }
    }
  };

  return (
    <>
      <ProjectHeader project={project} activeMenu="settings" />
      <Container>
        <Sidebar id={project.id} activeMenu="invitations" />
        <Wrap>
          <Title>Invitations ({invitationList.length})</Title>
          <HorizontalRule />
          <InviteMemberForm onSuggest={handleSuggest} onInvite={handleInvite} />
          <MemberList members={invitationList} onRemove={handleRemove} />
        </Wrap>
      </Container>
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
