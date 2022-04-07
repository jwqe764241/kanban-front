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
import MemberForm from "components/project/settings/MemberForm";

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

const MemberSettings = ({ project, members }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);
  const [memberList, setMemberList] = useState([...members]);

  const onRemove = async (userId) => {
    let response;
    try {
      response = await requester.delete(
        `/projects/${project.id}/members/${userId}`,
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
      <Container>
        <Sidebar id={project.id} activeMenu="members" />
        <Wrap>
          <Title>Members ({memberList.length})</Title>
          <HorizontalRule />
          <MemberForm
            members={memberList}
            setMembers={setMemberList}
            onRemove={onRemove}
          />
        </Wrap>
      </Container>
    </>
  );
};

MemberSettings.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  members: PropTypes.arrayOf(PropTypes.object),
};

MemberSettings.defaultProps = {
  members: [],
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
      const [projectResponse, memberResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/members`, token),
      ]);
      return {
        props: {
          project: projectResponse.data,
          members: memberResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(MemberSettings);
