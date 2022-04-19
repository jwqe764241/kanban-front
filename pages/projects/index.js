import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseCookie } from "core/utils";
import wrapper from "core/store";
import axios, { createRequester } from "core/apiAxios";

import ProjectIcon from "public/icons/project.svg";
import ProjectCards from "components/dashboard/ProjectCards";

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const CardContainer = styled.div`
  padding: 2rem 5rem;
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

const NewProjectLink = styled.div`
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

const Dashboard = ({ projects }) => {
  return (
    <Container>
      <CardContainer>
        <Title>
          <ProjectIcon />
          <span>Your Projects</span>
        </Title>
        <ProjectCards.Grid>
          {projects.map((project) => (
            <ProjectCards.Card key={project.id} project={project} />
          ))}
          <Link href="/projects/new">
            <NewProjectLink>Create new project...</NewProjectLink>
          </Link>
        </ProjectCards.Grid>
      </CardContainer>
    </Container>
  );
};

Dashboard.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

Dashboard.defaultProps = {
  projects: [],
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookies = parseCookie(context.req.headers.cookie);
    const requester = createRequester(
      axios,
      store.dispatch,
      cookies.REFRESH_TOKEN,
    );

    const result = {};
    const { token } = store.getState();
    try {
      const [projectResponse] = await Promise.all([
        requester.get("/projects", token),
      ]);

      result.projects = projectResponse.data;
    } catch (e) {
      console.log(e);
    }

    return {
      props: { ...result },
    };
  },
);

export default connect((state) => state)(Dashboard);
