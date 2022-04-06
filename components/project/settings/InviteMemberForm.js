import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import RemoveIcon from "public/icons/close-lg.svg";
import { SuccessButton, NoStyleButton } from "components/layout/Button";
import { Form } from "components/layout/Form";
import Modal from "components/layout/Modal";
import InviteUserModal from "components/project/members/InviteUserModal";

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 1rem;
`;

const List = styled.div``;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.gray80};

  &:first-child {
    padding: 0 0 1rem;
  }

  & ~ & {
    border-top: 1px solid ${({ theme }) => theme.colors.gray20};
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Email = styled.div`
  font-size: 0.875rem;
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

const InviteMemberForm = ({ invitations, onSuggest, onInvite, onRemove }) => {
  const [isInviteUserOpen, setInviteUserOpen] = useState(false);
  const [invitationList, setInvitationList] = useState([...invitations]);

  const handleInvite = async (user) => {
    const response = await onInvite(user);
    if (response.status === 200) {
      setInvitationList((oldArray) => [...oldArray, response.data]);
    } else if (response.status === 409) {
      alert("User was already invited");
    }
  };

  const handleRemove = async (userId) => {
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
      <Form>
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
        <List>
          {invitationList.map((member) => (
            <Item>
              <Info>
                <Name>{member.name}</Name>
                <Email>{member.email}</Email>
              </Info>
              <RemoveButton onClick={() => handleRemove(member.id)}>
                <RemoveIcon />
              </RemoveButton>
            </Item>
          ))}
        </List>
      </Form>
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
  invitations: PropTypes.arrayOf(PropTypes.object),
  onSuggest: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

InviteMemberForm.defaultProps = {
  invitations: [],
};

export default InviteMemberForm;
