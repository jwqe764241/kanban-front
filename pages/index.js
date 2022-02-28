import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseCookie } from "core/utils";
import wrapper from "core/store";
import axios, { createRequester } from "core/apiAxios";

import ProjectCards from "components/dashboard/ProjectCards";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cultured};
  overflow-y: auto;
  padding: 2.5rem;
`;

const ProjectSection = styled.div`
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.platinum};
  border-radius: 4px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 1.75rem;
`;

const Dashboard = ({ projects }) => {
  return (
    <Container>
      <ProjectSection>
        <Title>Your Projects</Title>
        <ProjectCards.Grid>
          {projects.map((project) => (
            <ProjectCards.Card key={project.id} project={project} />
          ))}
        </ProjectCards.Grid>
      </ProjectSection>
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
