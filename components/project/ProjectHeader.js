import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateString } from "core/utils";

import ProjectMenu from "components/project/ProjectMenu";

const ProjectInfo = styled.div`
  padding: 25px 32px 20px 32px;
  border-bottom: 1px solid #e1e4e8;
  color: #212427;
  background-color: #fafbfc;
`;

const Name = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

const CreatedDate = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #4f4f4f;
`;

const Description = styled.div`
  padding-top: 15px;
  font-size: 14px;
  font-weight: 300;
`;

const ProjectHeader = ({ project, activeMenu, showDescription }) => {
  const { id, name, description, createdAt } = project;
  return (
    <ProjectInfo>
      <div>
        <Name>{name}</Name>
        <CreatedDate>{getDateString(createdAt)}</CreatedDate>
      </div>
      {showDescription ? <Description>{description}</Description> : <></>}
      <ProjectMenu id={id} activeMenu={activeMenu} />
    </ProjectInfo>
  );
};

ProjectHeader.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  activeMenu: PropTypes.string.isRequired,
  showDescription: PropTypes.bool,
};

ProjectHeader.defaultProps = {
  showDescription: true,
};

export default ProjectHeader;
