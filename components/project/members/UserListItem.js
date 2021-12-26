import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateTimeString } from "core/utils";

import { ListItem } from "components/layout/List";
import { NoStyleButton } from "components/layout/Button";
import { RemoveIcon } from "components/layout/Icon";

const Column = styled.div`
  display: inline-block;
  width: 33.3%;
`;

const Username = styled(Column)`
  font-size: 16px;
  font-weight: 600;
`;

const Email = styled(Column)`
  font-size: 14px;
  font-weight: 400;
`;

const Date = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #6a737d;
`;

const RemoveButtonWrap = styled(Column)`
  text-align: end;
`;

const RemoveButton = ({ onClick }) => {
  return (
    <NoStyleButton type="button" onClick={onClick}>
      <RemoveIcon />
    </NoStyleButton>
  );
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const UserListItem = ({ user, onRemoveItemClick }) => {
  return (
    <ListItem>
      <div>
        <Username>{user.name}</Username>
        <Email>{user.email}</Email>
        <RemoveButtonWrap>
          <RemoveButton onClick={() => onRemoveItemClick(user.id)} />
        </RemoveButtonWrap>
      </div>
      <Date>{getDateTimeString(user.date)}</Date>
    </ListItem>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveItemClick: PropTypes.func,
};

UserListItem.defaultProps = {
  onRemoveItemClick: () => {},
};

export default UserListItem;
