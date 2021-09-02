import styled from "styled-components";
import PropTypes from "prop-types";

import { ListItem } from "components/layout/List";

const Column = styled.div`
  display: inline-block;
  width: 33.3%;
`;

const Username = styled(Column)`
  margin-right: 20px;
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

const MemberListItem = ({ member }) => {
  return (
    <ListItem>
      <div>
        <Username>{member.name}</Username>
        <Email>{member.email}</Email>
      </div>
      <Date>{member.date}</Date>
    </ListItem>
  );
};

MemberListItem.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default MemberListItem;
