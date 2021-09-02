import PropTypes from "prop-types";

import { ListHeader } from "components/layout/List";

const MemberListHeader = ({ count }) => {
  return <ListHeader>{`${count} Members`}</ListHeader>;
};

MemberListHeader.propTypes = {
  count: PropTypes.number.isRequired,
};

export default MemberListHeader;
