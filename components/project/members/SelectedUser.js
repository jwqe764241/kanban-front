import PropTypes from "prop-types";
import styled from "styled-components";

import { RemoveButton } from "components/layout/Button";

const Container = styled.div`
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Username = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #6a737d;
  padding-top: 5px;
`;

const SelectedUser = ({ user, onCancel }) => {
  return (
    <Container>
      <FlexContainer>
        <div style={{ width: "95%" }}>
          <Name>{user.name}</Name>
          <Username>{user.username}</Username>
        </div>
        <div style={{ width: "5%" }}>
          <RemoveButton
            style={{ float: "right", padding: 0 }}
            onClick={onCancel}
          />
        </div>
      </FlexContainer>
    </Container>
  );
};

SelectedUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SelectedUser;
