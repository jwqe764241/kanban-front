import { useState } from "react";
import Column from "components/Column";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";

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
  },
  columnOrder: ["column-1"],
};

function Homepage() {
  const [data] = useState(initData);

  const onDragEnd = () => {};

  resetServerContext();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default Homepage;
