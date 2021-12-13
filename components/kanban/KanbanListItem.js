import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { getDateString } from "core/utils";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { DropdownIcon } from "components/layout/Icon";

const Container = styled.div`
  padding: 24px 0px;
  border-bottom: 1px solid #e1e4e8;
  color: #212427;
  position: relative;

  &:first-child {
    padding-top: 0px;
  }
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #2455e7;
  margin-bottom: 10px;
  cursor: pointer;
  display: inline-block;

  &: hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #484848;
`;

const CreatedDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
  color: #6a737d;
`;

const DropdownWrap = styled.span`
  position: absolute;
  left: auto;
  right: 0px;
  cursor: pointer;
`;

const KanbanListItem = ({ kanban }) => {
  const { projectId, sequenceId, name, description, createdAt } = kanban;
  return (
    <Container>
      <DropdownWrap>
        <DropdownMenu icon={<DropdownIcon />}>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}/edit`}>
            <DropdownButton type="button">Edit</DropdownButton>
          </Link>
        </DropdownMenu>
      </DropdownWrap>
      <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
        <Name>{name}</Name>
      </Link>
      <Description>{description}</Description>
      <CreatedDate>{getDateString(createdAt)}</CreatedDate>
    </Container>
  );
};

KanbanListItem.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    sequenceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default KanbanListItem;
