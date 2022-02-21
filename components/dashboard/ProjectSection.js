import styled from "styled-components";

import ProjectCard from "./ProjectCard";

const Title = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 1.75rem;
`;

const ProjectCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  column-gap: 1.25rem;
  row-gap: 1.25rem;
`;

const ProjectSection = styled.div`
  padding: 2rem 1.5rem;
  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 4px;
`;

ProjectSection.Title = Title;
ProjectSection.CardContainer = ProjectCardContainer;
ProjectSection.Card = ProjectCard;

export default ProjectSection;
