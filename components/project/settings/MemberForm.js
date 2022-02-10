import { useState } from "react";
import PropTypes from "prop-types";

import { List, ListHeader, EmptyList } from "components/layout/List";
import UserListItem from "components/layout/UserListItem";

const MemberForm = ({ members, onRemove }) => {
  const [memberList, setMemberList] = useState([...members]);

  const or = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) {
      return;
    }
    const response = await onRemove(userId);
    if (response.status === 200) {
      const index = memberList.findIndex((member) => member.id === userId);
      if (index !== -1) {
        memberList.splice(index, 1);
        setMemberList([...memberList]);
      }
    } else if (response.status === 400) {
      alert("You can't remove admin");
    } else if (response.status === 403) {
      alert("You have no permission to do this");
    }
  };

  return memberList && memberList.length > 0 ? (
    <List>
      <ListHeader>{`${memberList.length} Members`}</ListHeader>
      {memberList.map((member) => (
        <UserListItem key={member.id} user={member} remove onRemove={or} />
      ))}
    </List>
  ) : (
    <EmptyList>No members in this project</EmptyList>
  );
};

MemberForm.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
};

MemberForm.defaultProps = {
  members: [],
};

export default MemberForm;
