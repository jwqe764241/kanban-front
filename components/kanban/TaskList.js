import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  padding: 1rem 0;
  overflow-x: hidden;
  overflow-y: auto;
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
