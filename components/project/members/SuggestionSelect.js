import PropTypes from "prop-types";
import styled from "styled-components";

const Select = styled.ul`
  width: 100%;
  max-height: 200px;
  margin-top: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  overflow-y: scroll;
`;

const Item = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #e1e4e8;

  &: last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #00509d;
    color: white !important;
  }

  &:hover * {
    color: white !important;
  }
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const Login = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #6a737d;
  padding-top: 5px;
`;

const SuggestionSelect = ({ list, onSelect }) => {
  const onItemClick = (e) => {
    const { index } = e.currentTarget.dataset;
    const user = list[index];
    if (user) {
      onSelect(user);
    }
  };

  return (
    <>
      {list ? (
        <Select>
          {list.map((user, index) => (
            <Item key={user.id} data-index={index} onClick={onItemClick}>
              <Name>{user.name}</Name>
              <Login>{user.login}</Login>
            </Item>
          ))}
        </Select>
      ) : (
        <></>
      )}
    </>
  );
};

SuggestionSelect.propTypes = {
  list: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

SuggestionSelect.defaultProps = {
  list: [],
};

export default SuggestionSelect;
