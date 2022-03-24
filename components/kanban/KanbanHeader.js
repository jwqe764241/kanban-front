import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import KanbanInfoModal from "./KanbanInfoModal";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Name = styled.span`
  display: inline-block;
  margin-right: 0.5em;
  font-weight: 700;
  cursor: pointer;
  padding: 0.5rem;
  color:${({ theme }) => theme.colors.black}

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const KanbanHeader = ({ project, kanban }) => {
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
        <div />
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
