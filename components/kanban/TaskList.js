import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  padding-bottom: 0.5rem;
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
    background-color: ${({ theme }) => theme.colors.scrollbarTrack};
    border-radius: 4px;
  }
`;

const TaskList = ({ droppableId, children }) => {
  return (
    <Droppable droppableId={droppableId} direction="vertical" type="task">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

TaskList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TaskList.defaultProps = {
  children: <></>,
};

export default TaskList;
