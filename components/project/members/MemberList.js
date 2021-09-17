import PropTypes from "prop-types";
import styled from "styled-components";

import { List } from "components/layout/List";
import MemberListHeader from "components/project/members/MemberListHeader";
import MemberListItem from "components/project/members/MemberListItem";

const EmptyList = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  text-align: center;
  padding: 60px 0px;
  font-size: 18px;
  font-weight: 500;
`;

const MemberList = ({ list, headerText, onRemoveMemberClick }) => {
  return (
    <>
      {list && list.length > 0 ? (
        <List>
          <MemberListHeader count={list.length} text={headerText} />
          {list.map((member) => (
            <MemberListItem
              key={member.name}
              member={member}
              onRemoveMemberClick={onRemoveMemberClick}
            />
          ))}
        </List>
      ) : (
        <EmptyList>You haven&apos;t invited any users yet</EmptyList>
      )}
    </>
  );
};

MemberList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  headerText: PropTypes.string,
  onRemoveMemberClick: PropTypes.func,
};

MemberList.defaultProps = {
  list: [],
  headerText: "",
  onRemoveMemberClick: () => {},
};

export default MemberList;
