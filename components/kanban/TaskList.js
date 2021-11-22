import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const ListContainer = styled.div`
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0px 8px 8px 8px;
`;

const TaskList = ({ droppableId, children }) => {
  return (
    <Droppable droppableId={droppableId} direction="vertical" type="TASK">
      {(provided) => (
        <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </ListContainer>
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
