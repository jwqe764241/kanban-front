import React, { useState } from "react";
import Column from "components/Column";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;

const initData = {
  tasks: {
    "task-1": { id: "task-1", content: "Test content of task-1" },
    "task-2": { id: "task-2", content: "Test content of task-2" },
    "task-3": { id: "task-3", content: "Test content of task-3" },
    "task-4": { id: "task-4", content: "Test content of task-4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

const InnerList = React.memo(
  (props) => {
    const { column, tasks, index, isDropDisabled } = props;
    return (
      <Column
        key={column.id}
        column={column}
        tasks={tasks}
        index={index}
        isDropDisabled={isDropDisabled}
      />
    );
  },
  (prevProps, nextProps) => {
    if (
      nextProps.column === prevProps.column &&
      nextProps.tasks === prevProps.tasks &&
      nextProps.index === prevProps.index
    ) {
      return false;
    }
    return true;
  },
);

function Homepage() {
  const [data, setData] = useState(initData);

  resetServerContext();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };

      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
              const isDropDisabled = false;

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  isDropDisabled={isDropDisabled}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Homepage;
