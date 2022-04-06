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

  const close = () => {
    setSuggestionUsers(null);
    setSelectedUser(null);
    setInviting(false);
    setShow(false);
  };

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
    close();
  };

  return (
    <Modal show={show} onClose={close}>
      <Modal.Header>
        <Modal.Title>Invite a member</Modal.Title>
        <Modal.CloseButton onClick={close} />
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
              onChange={onStartDelay}
            />
            <SuggestionSelect
              list={suggestionUsers}
              onSelect={onSuggestionSelect}
            />
          </Form>
        )}
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
