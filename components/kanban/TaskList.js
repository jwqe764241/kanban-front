import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0px 0.5rem 0.5rem 0.5rem;
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
