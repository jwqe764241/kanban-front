export function getOrderedList(columns) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return [];
  }

  if (columns.length === 1) {
    return [columns[0]];
  }

  const copiedColumns = [...columns];
  const cached = {};
  let first = null;
  copiedColumns.forEach((element) => {
    if (!element.prevId) {
      first = element;
    } else {
      cached[element.prevId] = element;
    }
  });

  const ordered = [first];
  let temp = first;
  while (cached[temp.id]) {
    const next = cached[temp.id];
    ordered.push(next);
    temp = next;
  }

  return ordered;
}

export const KanbanData = (initColumns, initTasks) => {
  const columns = {};
  const tasks = {};
  initColumns.forEach((column) => {
    columns[column.id] = column;
  });

  Object.keys(initTasks).forEach((columnId) => {
    const tasksOfColumn = initTasks[columnId];
    const mapped = {};
    tasksOfColumn.forEach((task) => {
      mapped[task.id] = task;
    });
    tasks[columnId] = mapped;
  });

  const applyColumnAction = (actionType, payload) => {
    if (actionType === "Insert") {
      columns[payload.id] = payload;
      tasks[payload.id] = {};
    } else if (actionType === "Delete") {
      const { deletedColumnId, updatedColumn } = payload;
      delete columns[deletedColumnId];
      if (updatedColumn) {
        columns[updatedColumn.id] = updatedColumn;
      }
    } else if (actionType === "Reorder") {
      payload.forEach((value) => {
        columns[value.id] = value;
      });
    } else if (actionType === "Update") {
      columns[payload.id] = payload;
    }
  };

  const applyTaskAction = (actionType, payload) => {};

  return {
    get: () => {
      const copiedColumns = Object.values(columns);
      copiedColumns.forEach((column, index) => {
        if (tasks[column.id]) {
          const orderedTasks = getOrderedList(Object.values(tasks[column.id]));
          copiedColumns[index].tasks = orderedTasks;
        } else {
          copiedColumns[index].tasks = [];
        }
      });
      return getOrderedList(copiedColumns);
    },
    applyAction: (action) => {
      const { target, actionType, payload } = action;
      if (target === "Column") {
        applyColumnAction(actionType, payload);
      } else if (target === "Task") {
        applyTaskAction(actionType, payload);
      }
    },
  };
};
