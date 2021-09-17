import PropTypes from "prop-types";

import { ListHeader } from "components/layout/List";

const MemberListHeader = ({ count, text }) => {
  return <ListHeader>{`${count} ${text}`}</ListHeader>;
};

MemberListHeader.propTypes = {
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default MemberListHeader;
