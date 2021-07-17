import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Task from "components/kanban/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 280px;
  border-radius: 3px;
  margin-right: 40px;
  display: inline-flex;
  flex-direction: column;
  background-color: #f6f8fc;
  box-shadow: rgb(0 0 0 / 24%) 0px 4px 8px;
  overflow: hidden;
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  padding: 15px 0px 20px 0px;
`;

const TaskContainer = styled.div`
  padding: 0px 10px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  color: #707090;
`;

const TaskList = styled.div`
  min-height: 100px;
`;

const ColorBar = styled.div`
  height: 4px;
  background: linear-gradient(to right, #cb7fec, #df758d);
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
          <ColorBar />
          <TaskContainer>
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
          </TaskContainer>
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
