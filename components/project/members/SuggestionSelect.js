import PropTypes from "prop-types";
import styled from "styled-components";

const List = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const Item = styled.div`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.gray80};
  cursor: pointer;
  transition: background-color 0.1s ease;

  & ~ & {
    border-top: 1px solid ${({ theme }) => theme.colors.gray20};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgray30};
  }
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.colors.gray50};
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 3rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkgray50};
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
        <>
          {list.length > 0 ? (
            <List>
              {list.map((user, index) => (
                <Item key={user.id} data-index={index} onClick={onItemClick}>
                  <Name>{user.name}</Name>
                  <Username>{user.username}</Username>
                </Item>
              ))}
            </List>
          ) : (
            <Empty>Could not found matched users :(</Empty>
          )}
        </>
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
