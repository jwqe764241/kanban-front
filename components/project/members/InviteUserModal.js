import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "components/layout/Modal";
import { SuccessButton } from "components/layout/Button";
import { Form, Input } from "components/layout/Form";
import SuggestionSelect from "components/project/members/SuggestionSelect";
import SelectedUser from "components/project/members/SelectedUser";

const InviteUserModal = ({ show, setShow, onSuggest, onInvite }) => {
  const [suggestionUsers, setSuggestionUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInviting, setInviting] = useState(false);

  const handleClose = () => {
    setSuggestionUsers(null);
    setSelectedUser(null);
    setInviting(false);
    setShow(false);
  };

  const handleSelectSuggest = (user) => {
    setSelectedUser(user);
  };

  let timer = null;
  const handleSearchChange = (e) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const { value } = e.target;
      if (value) {
        const users = await onSuggest(value);
        setSuggestionUsers(users);
      } else {
        setSuggestionUsers(null);
      }
    }, 1000);
  };

  const handleInviteClick = () => {
    if (selectedUser) {
      setInviting(() => !isInviting);
      onInvite(selectedUser);
      setInviting(() => !isInviting);
    }
    handleClose();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Invite a member</Modal.Title>
        <Modal.CloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        {selectedUser ? (
          <SelectedUser
            user={selectedUser}
            onCancel={() => {
              setSelectedUser(null);
            }}
          />
        ) : (
          <Form>
            <Input
              type="text"
              placeholder="Search by username"
              onChange={handleSearchChange}
            />
            <SuggestionSelect
              list={suggestionUsers}
              onSelect={handleSelectSuggest}
            />
          </Form>
        )}
        <SuccessButton
          onClick={handleInviteClick}
          disabled={!!(selectedUser == null || isInviting)}
        >
          {selectedUser != null
            ? isInviting === true
              ? "Inviting user..."
              : "Invite a member to project"
            : "Select a member to invite"}
        </SuccessButton>
      </Modal.Body>
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
