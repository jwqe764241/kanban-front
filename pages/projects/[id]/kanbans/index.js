import { connect } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import ProjectHeader from "components/project/ProjectHeader";
import KanbanCards from "components/project/KanbanCards";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cultured};
`;

const Body = styled.div`
  padding: 2rem 3rem;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 2rem;
`;

const KanbanList = ({ project, kanbans }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <Body>
        <Title>Kanbans</Title>
        <KanbanCards.Grid>
          {kanbans.map((kanban) => (
            <KanbanCards.Card key={kanban.sequenceId} kanban={kanban} />
          ))}
        </KanbanCards.Grid>
      </Body>
    </Container>
  );
};

KanbanList.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  kanbans: PropTypes.arrayOf(PropTypes.object),
};

KanbanList.defaultProps = {
  kanbans: [],
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
      const [projectResponse, kanbanResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/kanbans`, token),
      ]);

      return {
        props: {
          project: projectResponse.data,
          kanbans: kanbanResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(KanbanList);
