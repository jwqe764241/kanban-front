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
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 1.75rem;
`;

const ProjectContainer = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 4px;
  box-shadow: rgb(100 100 111 / 25%) 0px 0px 10px 0px;
`;

const ProjectCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 1.25rem;
  row-gap: 1.25rem;
`;

const ProjectCardBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 1.5rem;
  border: 1px solid #dadada;
  border-radius: 4px;
`;

const ProjectName = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const ProjectDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 300;
  height: 2em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
  return (
    <Container>
      <ProjectContainer>
        <Title>Your Projects</Title>
        <ProjectCardContainer>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectCardContainer>
      </ProjectContainer>
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
