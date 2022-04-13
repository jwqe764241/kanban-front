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
  background-color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryHover};
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

const Card = ({ kanban }) => {
  const { projectId, sequenceId, name, description } = kanban;

  return (
    <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
      <CardContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </CardContainer>
    </Link>
  );
};

Card.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    sequenceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

const KanbanCards = {};
KanbanCards.Grid = CardGrid;
KanbanCards.Card = Card;

export default KanbanCards;
