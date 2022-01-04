import { useState } from "react";
import PropTypes from "prop-types";

import UserList from "components/project/members/UserList";

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
      alert("You can't remove project owner");
    } else if (response.status === 403) {
      alert("You have no permission to do this");
    }
  };

  return (
    <UserList
      list={memberList}
      headerText="Members"
      emptyText="No members in this project"
      onRemoveItemClick={or}
    />
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
