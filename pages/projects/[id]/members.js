import { connect } from "react-redux";
import PropTypes from "prop-types";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import { ContainerXL } from "components/layout/Container";
import ProjectHeader from "components/project/ProjectHeader";
import { List, ListHeader, EmptyList } from "components/layout/List";
import UserListItem from "components/layout/UserListItem";

const Members = ({ project, members }) => {
  return (
    <>
      <ProjectHeader project={project} activeMenu="members" />
      <ContainerXL>
        {members && members.length > 0 ? (
          <List>
            <ListHeader>{`${members.length} Members`}</ListHeader>
            {members.map((member) => (
              <UserListItem key={member.id} user={member} />
            ))}
          </List>
        ) : (
          <EmptyList>No members in this project</EmptyList>
        )}
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
  members: PropTypes.arrayOf(PropTypes.object),
};

Members.defaultProps = {
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

export default connect((state) => state)(Members);
