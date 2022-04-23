import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateTimeString } from "core/utils";

import Modal from "components/layout/Modal";

const InfoContainer = styled.div`
  font-size: 0.85rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const InfoWrap = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

const InfoType = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  margin-right: 0.5rem;
  font-weight: 500;
`;

const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;

const DescriptionInfo = styled(InfoType)`
  margin-bottom: 0.5rem;
`;

const DescriptionText = styled(InfoText)`
  line-height: 1.25rem;
`;

const KanbanInfoModal = ({ show, setShow, kanban }) => {
  const { name, description, createdAt } = kanban;
  const close = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <Modal.Title>{`${name} Info`}</Modal.Title>
        <Modal.CloseButton onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <InfoContainer>
          <InfoWrap>
            <InfoType>Name:</InfoType>
            <InfoText>{name}</InfoText>
          </InfoWrap>
          <InfoGrid>
            <InfoWrap>
              <InfoType>Date:</InfoType>
              <InfoText>{getDateTimeString(createdAt)}</InfoText>
            </InfoWrap>
          </InfoGrid>
          <div>
            <DescriptionInfo>Description:</DescriptionInfo>
            <DescriptionText>{description}</DescriptionText>
          </div>
        </InfoContainer>
      </Modal.Body>
    </Modal>
  );
};

KanbanInfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default KanbanInfoModal;
