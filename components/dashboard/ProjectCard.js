import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateString } from "core/utils";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 1.5rem;
  border: 1px solid #dadada;
  border-radius: 4px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Description = styled.div`
  height: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.25rem;
  font-size: 0.8rem;
  font-weight: 300;
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
    <Container>
      <Link href={`/projects/${id}/kanbans`}>
        <Name>{name}</Name>
      </Link>
      <Description>{description}</Description>
      <Date>{getDateString(createdAt)}</Date>
    </Container>
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

export default ProjectCard;
