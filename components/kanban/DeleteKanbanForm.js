import styled from "styled-components";
import PropTypes from "prop-types";

import { DangerButton } from "components/layout/Button";

const Container = styled.div`
  margin: 20px 0px 20px 0px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: slategrey;
  margin-bottom: 20px;
`;

const DeleteKanbanForm = ({ name, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Sure you want to delete this kanban?")) {
      onDelete();
    }
  };

  return (
    <Container>
      <Title>Delete {name}</Title>
      <Description>
        Once you delete this project, there is no going back. Please be certain.
      </Description>
      <DangerButton style={{ width: "120px" }} onClick={handleDelete}>
        Delete kanban
      </DangerButton>
    </Container>
  );
};

DeleteKanbanForm.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteKanbanForm;
