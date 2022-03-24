import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import SettingIcon from "public/icons/setting.svg";
import Modal from "components/layout/Modal";
import ProjectInfoModal from "./ProjectInfoModal";

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

const Settings = styled.div`
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
        <div>
          <Link href={`/projects/${id}/settings`}>
            <Settings>
              <SettingIcon />
              <span>Settings</span>
            </Settings>
          </Link>
        </div>
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
