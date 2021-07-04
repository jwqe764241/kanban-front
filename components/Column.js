import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Task from "components/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = React.memo(
  (props) => {
    const { tasks } = props;

    return tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  },
  (prevProps, nextProps) => {
    if (nextProps.tasks === prevProps.tasks) {
      return false;
    }
    return true;
  },
);

function Column(props) {
  const { column, tasks, index, isDropDisabled } = props;
  const { title } = column;

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{title}</Title>
          <Droppable
            droppableId={column.id}
            // type={column.id === "column-3" ? "done" : "activate"}
            isDropDisabled={isDropDisabled}
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
};

export default Column;
