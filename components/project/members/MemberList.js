import PropTypes from "prop-types";

import { List } from "components/layout/List";
import MemberListHeader from "components/project/members/MemberListHeader";
import MemberListItem from "components/project/members/MemberListItem";

const MemberList = ({ list, onRemoveMemberClick }) => {
  return (
    <List>
      <MemberListHeader count={list.length} />
      {list.map((member) => (
        <MemberListItem
          key={member.name}
          member={member}
          onRemoveMemberClick={onRemoveMemberClick}
        />
      ))}
    </List>
  );
};

MemberList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  onRemoveMemberClick: PropTypes.func,
};

MemberList.defaultProps = {
  list: [],
  onRemoveMemberClick: () => {},
};

export default MemberList;
