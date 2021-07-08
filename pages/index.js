import React, { useState } from "react";
import Column from "components/Column";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

const Panel = styled.div`
  flex: 1;
  overflow: auto;
  background-color: #eef2f9;
  padding: 40px;
`;

const KanbanName = styled.div`
  font-size: 35px;
  font-weight: 800;
  color: #707090;
`;

const KanbanContainer = styled.div`
  margin-top: 30px;
`;

const ColumnContainer = styled.div`
  display: block;
  box-sizing: border-box;
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

  const onDragEnd = (result) => {};

  return (
    <Panel>
      <KanbanName>Studio Board</KanbanName>
      <KanbanContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <ColumnContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => data.tasks[taskId],
                  );
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
              </ColumnContainer>
            )}
          </Droppable>
        </DragDropContext>
      </KanbanContainer>
    </Panel>
  );
}

export default Homepage;
