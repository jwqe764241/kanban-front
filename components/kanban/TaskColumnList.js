import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

const ListContainer = styled.div`
  display: flex;
`;

const TaskColumnList = ({ children }) => {
  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
      {(provided) => (
        <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  );
};

TaskColumnList.propTypes = {
  children: PropTypes.node,
};

TaskColumnList.defaultProps = {
  children: <></>,
};

export default TaskColumnList;
