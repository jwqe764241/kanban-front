import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import { ContainerXL } from "components/layout/Container";
import ProjectHeader from "components/project/ProjectHeader";
import UserList from "components/project/members/UserList";

const Members = ({ project, memberList }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [members, setMembers] = useState(memberList);

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

  return (
    <>
      <ProjectHeader project={project} activeMenu="members" />
      <ContainerXL>
        <UserList
          list={members}
          headerText="Members"
          emptyText="No members in this project"
          onRemoveItemClick={onRemoveMemberClick}
        />
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
    createdAt: PropTypes.string,
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
      const [projectResponse, memberResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/members`, token),
      ]);
      return {
        props: {
          project: projectResponse.data,
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
