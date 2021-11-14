import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "components/layout/Modal";
import { SuccessButton } from "components/layout/Button";
import { Input } from "components/layout/Form";
import SuggestionSelect from "components/project/members/SuggestionSelect";
import SelectedUser from "components/project/members/SelectedUser";

const Title = styled.div`
  padding: 30px 20px 10px 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const Container = styled.div`
  padding: 20px;
`;

const ButtonContainer = styled.div`
  padding: 0px 20px 15px 20px;
  display: flex;
  justify-content: flex-end;
`;

const InviteUserModal = ({ show, setShow, onSuggest, onInvite }) => {
  const [suggestionUsers, setSuggestionUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInviting, setInviting] = useState(false);

  const onSuggestionSelect = (user) => {
    setSelectedUser(user);
  };

  let timer = null;
  const onStartDelay = (e) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const { value } = e.target;
      if (value) {
        const data = await onSuggest(value);
        setSuggestionUsers(data);
      } else {
        setSuggestionUsers(null);
      }
    }, 1000);
  };

  const onInviteClick = () => {
    if (selectedUser) {
      setInviting(() => !isInviting);
      onInvite(selectedUser);
      setInviting(() => !isInviting);
    }
  };

  return (
    <Modal show={show} setShow={setShow}>
      <Title>Invite a member</Title>
      <Container>
        {selectedUser ? (
          <SelectedUser
            user={selectedUser}
            onCancel={() => {
              setSelectedUser(null);
            }}
          />
        ) : (
          <>
            <Input
              type="text"
              placeholder="Search by login"
              onChange={onStartDelay}
            />
            <SuggestionSelect
              list={suggestionUsers}
              onSelect={onSuggestionSelect}
            />
          </>
        )}
      </Container>
      <ButtonContainer>
        <SuccessButton
          onClick={onInviteClick}
          disabled={!!(selectedUser == null || isInviting)}
        >
          {selectedUser != null
            ? isInviting === true
              ? "Inviting user..."
              : "Invite a member to project"
            : "Select a member to invite"}
        </SuccessButton>
      </ButtonContainer>
    </Modal>
  );
};

InviteUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  onSuggest: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
};

export default InviteUserModal;
