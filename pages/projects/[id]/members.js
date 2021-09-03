import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import wrapper from "core/store";
import { parseCookie, getIndexOfId } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import { ContainerXL } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";
import ProjectHeader from "components/project/ProjectHeader";
import MemberList from "components/project/members/MemberList";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Members = ({ project, memberList }) => {
  const [members, setMembers] = useState(memberList);
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const onInviteMemberClick = () => {
    alert("clicked!");
  };

  const onRemoveMemberClick = async (userId) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await requester.delete(
        `/projects/${project.id}/members/${userId}`,
        token,
      );
      if (response.status === 200) {
        const index = getIndexOfId(members, userId);
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

  return (
    <>
      <ProjectHeader project={project} activeMenu="members" />
      <ContainerXL>
        <Container>
          <div />
          <SuccessButton
            style={{ width: "130px" }}
            onClick={onInviteMemberClick}
          >
            Invite member
          </SuccessButton>
        </Container>
        <MemberList list={members} onRemoveMemberClick={onRemoveMemberClick} />
      </ContainerXL>
    </>
  );
};

Members.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
  memberList: PropTypes.arrayOf(PropTypes.object),
};

Members.defaultProps = {
  memberList: [],
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
      const [userResponse, memberResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/members`, token),
      ]);
      return {
        props: {
          project: userResponse.data,
          memberList: memberResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(Members);
