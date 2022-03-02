import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import ChevronIcon from "public/icons/chevron.svg";
import InfoIcon from "public/icons/info.svg";
import SettingIcon from "public/icons/setting.svg";
import Modal from "components/layout/Modal";
import KanbanInfoModal from "./KanbanInfoModal";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.platinum};
`;

const InfoButton = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  vertical-align: bottom;

  & > svg {
    fill: ${({ theme }) => theme.colors.unitedNationsBlue};
  }
`;

const Name = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  display: inline-block;
  width: 1rem;
  margin-right: 0.5rem;
`;

const SettingLink = styled.a`
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;

  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: middle;
    transition: transform 0.5s ease;
  }

  &:hover > svg {
    transform: rotate(180deg);
  }
`;

const KanbanHeader = ({ project, kanban }) => {
  const { projectId, sequenceId } = kanban;
  const [isInfoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Container>
        <div>
          <Link href={`/projects/${projectId}/kanbans`}>
            <Name>{project.name}</Name>
          </Link>
          <Divider>
            <ChevronIcon />
          </Divider>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
            <Name>{kanban.name}</Name>
          </Link>
          <InfoButton onClick={() => setInfoOpen(true)}>
            <InfoIcon />
          </InfoButton>
        </div>
        <div>
          <Link href={`/projects/${projectId}/kanbans/${sequenceId}/edit`}>
            <SettingLink>
              <SettingIcon />
            </SettingLink>
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
