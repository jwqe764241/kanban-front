import PropTypes from "prop-types";
import styled from "styled-components";

import { List } from "components/layout/List";
import UserListHeader from "components/project/members/UserListHeader";
import UserListItem from "components/project/members/UserListItem";

const EmptyList = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  text-align: center;
  padding: 60px 0px;
  font-size: 18px;
  font-weight: 500;
`;

const UserList = ({ list, headerText, emptyText, onRemoveItemClick }) => {
  return (
    <>
      {list && list.length > 0 ? (
        <List>
          <UserListHeader count={list.length} text={headerText} />
          {list.map((user) => (
            <UserListItem
              key={user.name}
              user={user}
              onRemoveItemClick={onRemoveItemClick}
            />
          ))}
        </List>
      ) : (
        <EmptyList>{emptyText}</EmptyList>
      )}
    </>
  );
};

UserList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  headerText: PropTypes.string,
  emptyText: PropTypes.string,
  onRemoveItemClick: PropTypes.func,
};

UserList.defaultProps = {
  list: [],
  headerText: "",
  emptyText: "",
  onRemoveItemClick: () => {},
};

export default UserList;
