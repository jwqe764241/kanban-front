import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import EditIcon from "public/icons/edit.svg";
import Modal from "components/layout/Modal";
import KanbanInfoModal from "./KanbanInfoModal";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Name = styled.span`
  display: inline-block;
  padding: 0.5rem;
  margin-right: 0.5em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray70};
  cursor: pointer;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkgray60};
  cursor: pointer;
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.darkgray70};
  }

  & > svg {
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }
`;

const KanbanHeader = ({ kanban }) => {
  const { projectId, sequenceId } = kanban;
  const [isInfoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Container>
        <div>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
            <Name>{kanban.name}</Name>
          </Link>
        </div>
        <div>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}/edit`}>
            <Edit>
              <EditIcon />
              <span>Edit</span>
            </Edit>
          </Link>
        </div>
      </Container>
      <Modal.Portal>
        <KanbanInfoModal
          show={isInfoOpen}
          setShow={setInfoOpen}
          kanban={kanban}
        />
      </Modal.Portal>
    </>
  );
};

KanbanHeader.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default KanbanHeader;
