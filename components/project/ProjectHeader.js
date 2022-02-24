import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import InfoIcon from "public/icons/info.svg";
import SettingIcon from "public/icons/setting.svg";
import Modal from "components/layout/Modal";
import ProjectInfoModal from "./ProjectInfoModal";

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
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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
          <InfoButton onClick={() => setInfoOpen(true)}>
            <InfoIcon />
          </InfoButton>
        </div>
        <div>
          <Link href={`/projects/${id}/settings`}>
            <SettingLink>
              <SettingIcon />
            </SettingLink>
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
