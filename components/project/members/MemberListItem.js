import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateTimeString } from "core/utils";

import { ListItem } from "components/layout/List";
import { RemoveButton } from "components/layout/Button";

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

const MemberListItem = ({ member, onRemoveMemberClick }) => {
  return (
    <ListItem>
      <div>
        <Username>{member.name}</Username>
        <Email>{member.email}</Email>
        <RemoveButtonWrap>
          <RemoveButton onClick={() => onRemoveMemberClick(member.id)} />
        </RemoveButtonWrap>
      </div>
      <Date>{getDateTimeString(member.date)}</Date>
    </ListItem>
  );
};

MemberListItem.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveMemberClick: PropTypes.func,
};

MemberListItem.defaultProps = {
  onRemoveMemberClick: () => {},
};

export default MemberListItem;
