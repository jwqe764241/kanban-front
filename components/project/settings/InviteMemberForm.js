import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { SuccessButton } from "components/layout/Button";
import Modal from "components/layout/Modal";
import InviteUserModal from "components/project/members/InviteUserModal";

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const InviteMemberForm = ({ onSuggest, onInvite }) => {
  const [isInviteUserOpen, setInviteUserOpen] = useState(false);

  const handleInvite = async (user) => {
    try {
      await onInvite(user);
    } catch (e) {
      const { response } = e;
      if (response.status === 409) {
        alert("User was already invited");
      }
    }
  };

  return (
    <>
      <ButtonWrap>
        <SuccessButton
          style={{ width: "140px" }}
          onClick={() => {
            setInviteUserOpen(true);
          }}
        >
          Invite a member
        </SuccessButton>
      </ButtonWrap>
      <Modal.Portal>
        <InviteUserModal
          show={isInviteUserOpen}
          setShow={setInviteUserOpen}
          onSuggest={onSuggest}
          onInvite={handleInvite}
        />
      </Modal.Portal>
    </>
  );
};

InviteMemberForm.propTypes = {
  onSuggest: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
};

export default InviteMemberForm;
