import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import PlusIcon from "public/icons/plus.svg";
import SettingIcon from "public/icons/setting.svg";
import Modal from "components/layout/Modal";
import ProjectInfoModal from "./ProjectInfoModal";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Name = styled.div`
  display: inline-block;
  padding: 0.5rem;
  font-weight: 700;
  color: inherit;
  cursor: pointer;
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray30};
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
  margin-right: 0.5rem;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 400;
  color: inherit;
  cursor: pointer;
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray30};
  }

  & > svg {
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
  }
`;

const ProjectHeader = ({ project }) => {
  const { id, name } = project;
  const [isInfoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Container>
        <div>
          <Link href={`/projects/${id}/kanbans`}>
            <Name>{name}</Name>
          </Link>
        </div>
        <ButtonContainer>
          <Link href={`/projects/${id}/kanbans/new`}>
            <IconButton>
              <PlusIcon />
              <span>New kanban</span>
            </IconButton>
          </Link>
          <Link href={`/projects/${id}/settings`}>
            <IconButton>
              <SettingIcon />
              <span>Settings</span>
            </IconButton>
          </Link>
        </ButtonContainer>
      </Container>
      <Modal.Portal>
        <ProjectInfoModal
          show={isInfoOpen}
          setShow={setInfoOpen}
          project={project}
        />
      </Modal.Portal>
    </>
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
};

export default ProjectHeader;
