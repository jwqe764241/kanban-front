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

export function group(arr, key) {
  // eslint-disable-next-line func-names
  return arr.reduce((acc, current) => {
    const kv = current[key];
    if (acc[kv] === undefined) {
      acc[kv] = [];
    }
    acc[kv].push(current);
    return acc;
  }, {});
}

export function objMap(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      return [k, func(v)];
    }),
  );
}

export const KanbanData = (initColumns, initTasks) => {
  const columns = {};
  const tasks = {};
  initColumns.forEach((column) => {
    columns[column.id] = column;
  });

  initTasks.forEach((task) => {
    tasks[task.id] = task;
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

  const applyTaskAction = (actionType, payload) => {
    if (actionType === "Insert") {
      payload.forEach((value) => {
        tasks[value.id] = value;
      });
    } else if (actionType === "Delete") {
      const { deletedTaskId, updatedTask } = payload;
      delete tasks[deletedTaskId];
      if (updatedTask) {
        tasks[updatedTask.id] = updatedTask;
      }
    } else if (actionType === "Reorder") {
      payload.forEach((value) => {
        if (tasks[value.id] !== undefined) {
          tasks[value.id] = value;
        }
      });
    }
  };

  return {
    get: () => {
      const groupedTasks = group(Object.values(tasks), "taskColumnId");
      const orderedTasks = objMap(groupedTasks, getOrderedList);
      const mappedColumns = objMap(columns, (v) => {
        const column = {
          ...v,
          tasks: orderedTasks[v.id] === undefined ? [] : orderedTasks[v.id],
        };
        return column;
      });
      return getOrderedList(Object.values(mappedColumns));
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
