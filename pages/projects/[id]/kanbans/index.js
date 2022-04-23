import Link from "next/link";
import { connect } from "react-redux";
// import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import KanbanIcon from "public/icons/kanban.svg";
import ProjectHeader from "components/project/ProjectHeader";
import KanbanCards from "components/project/KanbanCards";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  overflow-y: auto;
`;

const Wrap = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.colors.black};

  & > svg {
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
  }
  & > span {
    font-weight: 600;
  }
`;

const NewKanbanLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkgray70};
  background-color: ${({ theme }) => theme.colors.darkgray30};
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgray40};
  }
`;

const KanbanList = ({ project, kanbans }) => {
  return (
    <>
      <ProjectHeader project={project} />
      <Container>
        <Wrap>
          <Title>
            <KanbanIcon />
            <span>Kanbans</span>
          </Title>
          <KanbanCards.Grid>
            {kanbans.map((kanban) => (
              <KanbanCards.Card key={kanban.sequenceId} kanban={kanban} />
            ))}
            <Link href={`/projects/${project.id}/kanbans/new`}>
              <NewKanbanLink>Create new kanban...</NewKanbanLink>
            </Link>
          </KanbanCards.Grid>
        </Wrap>
      </Container>
    </>
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
