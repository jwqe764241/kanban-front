import PropTypes from "prop-types";

import { List } from "components/layout/List";
import MemberListHeader from "components/project/members/MemberListHeader";
import MemberListItem from "components/project/members/MemberListItem";

const MemberList = ({ list }) => {
  return (
    <List>
      <MemberListHeader count={list.length} />
      {list.map((member) => (
        <MemberListItem key={member.name} member={member} />
      ))}
    </List>
  );
};

MemberList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

MemberList.defaultProps = {
  list: [],
};

export default MemberList;
