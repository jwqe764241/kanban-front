import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseCookie } from "core/utils";
import wrapper from "core/store";
import axios, { createRequester } from "core/apiAxios";

import { ContainerLg } from "components/layout/Container";
import { Header } from "components/layout/Page";

const Wrap = styled.div`
  padding: 24px 0px;
  border-bottom: 1px solid #e1e4e8;

  &: last-child {
    margin-bottom: 0px;
  }
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #2455e7;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #484848;
  margin-bottom: 20px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 400px;
  color: #646464;
`;

const Project = ({ project }) => {
  const { id, name, description, registerDate } = project;
  return (
    <Wrap>
      <Name>{name}</Name>
      <Description>{description}</Description>
      <Date>{registerDate}</Date>
    </Wrap>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
};

const Sections = styled.div`
  display: flex;
`;

const Projects = styled.div`
  width: 660px;
`;

const Tasks = styled.div`
  width: 300px;
`;

function Home(props) {
  const { projects } = props;

  return (
    <ContainerLg>
      <Sections>
        <Projects>
          {projects.map((project) => {
            return <Project key={project.id} project={project} />;
          })}
        </Projects>
        <Tasks>
          <></>
        </Tasks>
      </Sections>
    </ContainerLg>
  );
}

Home.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
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
    } catch (e) {}

    return {
      props: { ...result },
    };
  },
);

export default connect((state) => state)(Home);
