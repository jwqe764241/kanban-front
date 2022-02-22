import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { SuccessButton } from "components/layout/Button";
import { List, ListHeader, EmptyList } from "components/layout/List";
import UserListItem from "components/layout/UserListItem";
import Modal from "components/layout/Modal";
import InviteUserModal from "components/project/members/InviteUserModal";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 15px;
`;

const InviteMemberForm = ({ invitations, onSuggest, onInvite, onRemove }) => {
  const [isInviteUserOpen, setInviteUserOpen] = useState(false);
  const [invitationList, setInvitationList] = useState([...invitations]);

  const oi = async (user) => {
    const response = await onInvite(user);
    if (response.status === 200) {
      setInvitationList((oldArray) => [...oldArray, response.data]);
    } else if (response.status === 409) {
      alert("User was already invited");
    }
  };

  const or = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) {
      return;
    }
    const response = await onRemove(userId);
    if (response.status === 200) {
      const index = invitationList.findIndex(
        (invitedUser) => invitedUser.id === userId,
      );
      if (index !== -1) {
        invitationList.splice(index, 1);
        setInvitationList([...invitationList]);
      }
    } else if (response.status === 403) {
      alert("You have no permission to do this");
    }
  };

  return (
    <>
      <ButtonContainer>
        <SuccessButton
          style={{ width: "130px" }}
          onClick={() => {
            setInviteUserOpen(true);
          }}
        >
          Invite a member
        </SuccessButton>
      </ButtonContainer>
      {invitationList && invitationList.length > 0 ? (
        <List>
          <ListHeader>{`${invitationList.length} Invited Users`}</ListHeader>
          {invitationList.map((member) => (
            <UserListItem key={member.id} user={member} remove onRemove={or} />
          ))}
        </List>
      ) : (
        <EmptyList>You haven&apos;t invited any users yet</EmptyList>
      )}
      <Modal.Portal>
        <InviteUserModal
          show={isInviteUserOpen}
          setShow={setInviteUserOpen}
          onSuggest={onSuggest}
          onInvite={oi}
        />
      </Modal.Portal>
    </>
  );
};

InviteMemberForm.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.object),
  onSuggest: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

InviteMemberForm.defaultProps = {
  invitations: [],
};

export default InviteMemberForm;
