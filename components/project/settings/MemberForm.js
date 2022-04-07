import styled from "styled-components";
import PropTypes from "prop-types";

import RemoveIcon from "public/icons/close-lg.svg";
import { NoStyleButton } from "components/layout/Button";
import { Form } from "components/layout/Form";

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

const MemberForm = ({ members, setMembers, onRemove }) => {
  const handleRemove = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) {
      return;
    }
    const response = await onRemove(userId);
    if (response.status === 200) {
      const index = members.findIndex((member) => member.id === userId);
      if (index !== -1) {
        members.splice(index, 1);
        setMembers([...members]);
      }
    } else if (response.status === 400) {
      alert("You can't remove admin");
    } else if (response.status === 403) {
      alert("You have no permission to do this");
    }
  };

  return (
    <Form>
      <List>
        {members.map((member) => (
          <Item key={member.id}>
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
  );
};

MemberForm.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
  setMembers: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

MemberForm.defaultProps = {
  members: [],
};

export default MemberForm;
