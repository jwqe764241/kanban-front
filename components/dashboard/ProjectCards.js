import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 122px;
  grid-gap: 1rem;
`;

const CardContainer = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Name = styled.div`
  padding-bottom: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Description = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25em;
  color: ${({ theme }) => theme.colors.gray};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Card = ({ project }) => {
  const { id, name, description } = project;

  return (
    <Link href={`/projects/${id}/kanbans`}>
      <CardContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </CardContainer>
    </Link>
  );
};

Card.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

const ProjectCards = {};
ProjectCards.Grid = CardGrid;
ProjectCards.Card = Card;

export default ProjectCards;
