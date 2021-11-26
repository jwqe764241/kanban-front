import { toObject, group, objMap } from "core/utils";

// get ordered array using prevId
function getOrderedArray(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return [...arr];
  }

  const copied = [...arr];
  const cached = {};
  let first = null;
  copied.forEach((element) => {
    if (!element.prevId) {
      first = element;
    } else {
      cached[element.prevId] = element;
    }
  });

  // first element not found
  if (first === null) {
    return [];
  }

  const ordered = [first];
  let current = first;
  while (cached[current.id]) {
    const next = cached[current.id];
    ordered.push(next);
    current = next;
  }

  // if this is true, there is something wrong state in array
  // ex) has element that not in same linked list
  if (ordered.length !== arr.length) {
    // throw error or return empty array?
  }

  return ordered;
}

// store kanban data and apply kanban action to data
const KanbanDataStorage = (initColumns, initTasks) => {
  const columns = toObject(initColumns, "id");
  const tasks = toObject(initTasks, "id");

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
      const orderedTasks = objMap(groupedTasks, getOrderedArray);
      const mappedColumns = objMap(columns, (v) => {
        const column = {
          ...v,
          tasks: orderedTasks[v.id] === undefined ? [] : orderedTasks[v.id],
        };
        return column;
      });
      return getOrderedArray(Object.values(mappedColumns));
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

export default KanbanDataStorage;
