import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal, Buttons } from "components/layout/Modal";
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

const InviteUserModal = ({ show, setShow, onSuggest, onInvite, innerRef }) => {
  const [suggestionUsers, setSuggestionUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
      onInvite(selectedUser);
    }
  };

  return (
    <Modal show={show} setShow={setShow} innerRef={innerRef}>
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
      <Buttons>
        {selectedUser ? (
          <SuccessButton onClick={onInviteClick}>
            Invite a member to project
          </SuccessButton>
        ) : (
          <SuccessButton onClick={onInviteClick} disabled>
            Select a member to invite
          </SuccessButton>
        )}
      </Buttons>
    </Modal>
  );
};

InviteUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  onSuggest: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default InviteUserModal;
