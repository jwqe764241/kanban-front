import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateTimeString } from "core/utils";

import { RemoveButton } from "components/layout/Button";
import { RemoveIcon } from "components/layout/Icon";
import { ListItem } from "components/layout/List";

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

const ButtonWrap = styled(Column)`
  text-align: end;
`;

const UserListItem = ({ user, remove, onRemove }) => {
  return (
    <ListItem>
      <div>
        <Username>{user.name}</Username>
        <Email>{user.email}</Email>
        {remove ? (
          <ButtonWrap>
            <RemoveButton onClick={() => onRemove(user.id)} />
          </ButtonWrap>
        ) : (
          <></>
        )}
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
  remove: PropTypes.bool,
  onRemove: PropTypes.func,
};

UserListItem.defaultProps = {
  remove: false,
  onRemove: null,
};

export default UserListItem;
