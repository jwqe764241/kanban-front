import styled from "styled-components";
import PropTypes from "prop-types";

import { DangerButton } from "components/layout/Button";

const Title = styled.div`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: slategrey;
  margin-bottom: 20px;
`;

const DeleteForm = ({ onDelete }) => {
  return (
    <div>
      <Title>Delete Project</Title>
      <Description>
        Once you delete this project, there is no going back. Please be certain.
      </Description>
      <DangerButton style={{ width: "120px" }} onClick={onDelete}>
        Delete Project
      </DangerButton>
    </div>
  );
};

DeleteForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteForm;
