import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import ProjectInfoModal from "./ProjectInfoModal";

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
