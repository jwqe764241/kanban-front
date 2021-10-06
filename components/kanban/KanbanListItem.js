import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { getDateString } from "core/utils";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";

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

const RegisterDate = styled.div`
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

const DropdownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
};

const KanbanListItem = ({ kanban, innerRef }) => {
  const { projectId, sequenceId, name, description, registerDate } = kanban;
  return (
    <Container>
      <DropdownWrap>
        <DropdownMenu icon={<DropdownIcon />} innerRef={innerRef}>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}/edit`}>
            <DropdownButton type="button">Edit</DropdownButton>
          </Link>
        </DropdownMenu>
      </DropdownWrap>
      <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
        <Name>{name}</Name>
      </Link>
      <Description>{description}</Description>
      <RegisterDate>{getDateString(registerDate)}</RegisterDate>
    </Container>
  );
};

KanbanListItem.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    sequenceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    registerDate: PropTypes.string.isRequired,
  }).isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default KanbanListItem;
