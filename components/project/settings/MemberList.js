import styled from "styled-components";
import PropTypes from "prop-types";

import RemoveIcon from "public/icons/close-lg.svg";
import { NoStyleButton } from "components/layout/Button";

const Container = styled.div`
  padding: 1rem 0;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.darkgray80};

  &:first-child {
    padding: 0 0 1rem;
  }

  & ~ & {
    border-top: 1px solid ${({ theme }) => theme.colors.darkgray30};
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
  color: ${({ theme }) => theme.colors.darkgray60};
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

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  color: ${({ theme }) => theme.colors.darkgray70};
  font-weight: 600;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.darkgray30};
`;

const MemberList = ({ members, onRemove, emptyMessage }) => {
  const handleRemove = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) {
      return;
    }

    try {
      await onRemove(userId);
    } catch (e) {
      const { response } = e;
      if (response.status === 400) {
        alert("You can't remove admin");
      } else if (response.status === 403) {
        alert("You have no permission to do this");
      }
    }
  };

  return (
    <Container>
      {members.length > 0 ? (
        <div>
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
        </div>
      ) : (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      )}
    </Container>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};

MemberList.defaultProps = {
  members: [],
  emptyMessage: "List is empty",
};

export default MemberList;
