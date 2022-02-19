import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { parseCookie, getDateString } from "core/utils";
import wrapper from "core/store";
import axios, { createRequester } from "core/apiAxios";

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cultured};
  overflow-y: auto;
  padding: 2.5rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 1.5rem;
`;

const ProjectCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
`;

const ProjectCardBox = styled.div`
  padding: 1rem 1.5rem;
  border: 1px solid #dadada;
  border-radius: 4px;
`;

const ProjectName = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const ProjectDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 300;
  height: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 0.75rem;
  font-weight: 200;
  text-align: right;
`;

const ProjectCard = ({ project }) => {
  const { id, name, description, createdAt } = project;

  return (
    <ProjectCardBox>
      <Link href={`/projects/${id}/kanbans`}>
        <ProjectName>{name}</ProjectName>
      </Link>
      <ProjectDescription>{description}</ProjectDescription>
      <Date>{getDateString(createdAt)}</Date>
    </ProjectCardBox>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

const Home = ({ projects }) => {
  const copy = [];
  projects.forEach((element) => {
    copy.push(element);
    copy.push(element);
    copy.push(element);
    copy.push(element);
    copy.push(element);
  });

  return (
    <Container>
      <Title>Projects</Title>
      <ProjectCardContainer>
        {copy.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectCardContainer>
    </Container>
  );
};

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
    } catch (e) {
      console.log(e);
    }

    return {
      props: { ...result },
    };
  },
);

export default connect((state) => state)(Home);
