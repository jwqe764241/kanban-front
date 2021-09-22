import PropTypes from "prop-types";

import { ListHeader } from "components/layout/List";

const UserListHeader = ({ count, text }) => {
  return <ListHeader>{`${count} ${text}`}</ListHeader>;
};

UserListHeader.propTypes = {
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default UserListHeader;
