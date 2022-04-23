import PropTypes from "prop-types";
import styled from "styled-components";

import RemoveIcon from "public/icons/close-lg.svg";
import { NoStyleButton } from "components/layout/Button";

const Wrap = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray20};
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.gray80};
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.colors.gray50};
`;

const RemoveButton = styled(NoStyleButton)`
  width: 1em;
  height: 1em;
  padding: 0;
  float: right;
  font-size: 1em;
  color: currentColor;

  & > svg {
    display: block;
    fill: currentColor;
  }
`;

const SelectedUser = ({ user, onCancel }) => {
  return (
    <Wrap>
      <Container>
        <Info>
          <Name>{user.name}</Name>
          <Username>{user.username}</Username>
        </Info>

        <RemoveButton onClick={onCancel}>
          <RemoveIcon />
        </RemoveButton>
      </Container>
    </Wrap>
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
