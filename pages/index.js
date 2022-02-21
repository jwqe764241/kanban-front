import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseCookie } from "core/utils";
import wrapper from "core/store";
import axios, { createRequester } from "core/apiAxios";

import ProjectSection from "components/dashboard/ProjectSection";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cultured};
  overflow-y: auto;
  padding: 2.5rem;
`;

const Dashboard = ({ projects }) => {
  return (
    <Container>
      <ProjectSection>
        <ProjectSection.Title>Your Projects</ProjectSection.Title>
        <ProjectSection.CardContainer>
          {projects.map((project) => (
            <ProjectSection.Card key={project.id} project={project} />
          ))}
        </ProjectSection.CardContainer>
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
