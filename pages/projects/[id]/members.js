import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import { ContainerXL } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";
import ProjectHeader from "components/project/ProjectHeader";
import UserList from "components/project/members/UserList";
import { ModalPortal } from "components/layout/Modal";
import InviteUserModal from "components/project/members/InviteUserModal";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListWrap = styled.div`
  width: 49%;
`;

const Members = ({ project, memberList, invitedUserList }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [members, setMembers] = useState(memberList);
  const [isInviteUserOpen, setInviteUserOpen] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState(invitedUserList);

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
    try {
      const response = await requester.post(
        `/projects/${project.id}/invitations`,
        { userId: user.id },
        token,
      );
      if (response.status === 200) {
        setInvitedUsers((oldArray) => [...oldArray, response.data]);
      }
    } catch (e) {
      const { response } = e;
      if (response.status === 409) {
        alert("User was already invited");
      }
    }
  };

  const onRemoveMemberClick = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await requester.delete(
        `/projects/${project.id}/members/${userId}`,
        token,
      );
      if (response.status === 200) {
        const index = members.findIndex((member) => member.id === userId);
        if (index !== -1) {
          members.splice(index, 1);
          setMembers([...members]);
        }
      }
    } catch (e) {
      const { response } = e;
      if (response.status === 400) {
        alert("You can't remove project owner");
      } else if (response.status === 403) {
        alert("You have no permission to do this");
      }
    }
  };

  const onRemoveInviteClick = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      const response = await requester.delete(
        `/projects/${project.id}/invitations/${userId}`,
        token,
      );
      if (response.status === 200) {
        const index = invitedUsers.findIndex(
          (invitedUser) => invitedUser.id === userId,
        );
        if (index !== -1) {
          invitedUsers.splice(index, 1);
          setInvitedUsers([...invitedUsers]);
        }
      }
    } catch (e) {
      const { response } = e;
      if (response.status === 403) {
        alert("You have no permission to do this");
      }
    }
  };

  return (
    <>
      <ProjectHeader project={project} activeMenu="members" />
      <ContainerXL>
        <Container>
          <div />
          <SuccessButton
            style={{ width: "130px" }}
            onClick={() => {
              setInviteUserOpen(true);
            }}
          >
            Invite a member
          </SuccessButton>
        </Container>
        <ListContainer>
          <ListWrap>
            <UserList
              list={members}
              headerText="Members"
              emptyText="No members in this project"
              onRemoveItemClick={onRemoveMemberClick}
            />
          </ListWrap>
          <ListWrap>
            <UserList
              list={invitedUsers}
              headerText="Invited Users"
              emptyText="You haven't invited any users yet"
              onRemoveItemClick={onRemoveInviteClick}
            />
          </ListWrap>
        </ListContainer>
      </ContainerXL>
      <ModalPortal>
        <InviteUserModal
          show={isInviteUserOpen}
          setShow={setInviteUserOpen}
          onSuggest={onSuggest}
          onInvite={onInvite}
        />
      </ModalPortal>
    </>
  );
};

Members.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  memberList: PropTypes.arrayOf(PropTypes.object),
  invitedUserList: PropTypes.arrayOf(PropTypes.object),
};

Members.defaultProps = {
  memberList: [],
  invitedUserList: [],
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
    const props = {};
    try {
      const [projectResponse, memberResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/members`, token),
      ]);
      props.project = projectResponse.data;
      props.memberList = memberResponse.data;
    } catch (e) {
      return {
        notFound: true,
      };
    }

    try {
      const invitedUserResponse = await requester.get(
        `/projects/${id}/invitations`,
        token,
      );
      props.invitedUserList = invitedUserResponse.data;
    } catch (e) {
      props.invitedUserList = [];
    }

    return {
      props,
    };
  },
);

export default connect((state) => state)(Members);
