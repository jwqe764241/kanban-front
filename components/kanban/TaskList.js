import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div.attrs(({ empty }) => ({
  style: {
    padding: empty ? "0.25rem 0.5rem" : "0 0.5rem 0.25rem",
  },
}))`
  padding: 0 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.scrollbarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
`;

const TaskList = ({ droppableId, empty, children }) => {
  return (
    <Droppable droppableId={droppableId} direction="vertical" type="task">
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.droppableProps}
          empty={empty}
        >
          {children}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

TaskList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  empty: PropTypes.bool,
  children: PropTypes.node,
};

TaskList.defaultProps = {
  empty: true,
  children: <></>,
};

export default TaskList;
