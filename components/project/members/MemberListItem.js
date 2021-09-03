import styled from "styled-components";
import PropTypes from "prop-types";
import { getDateTimeString } from "core/utils";

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

const RemoveButtonWrap = styled(Column)`
  text-align: end;
`;

const NoStyleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const RemoveButton = ({ onClick }) => {
  return (
    <NoStyleButton type="button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </NoStyleButton>
  );
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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
