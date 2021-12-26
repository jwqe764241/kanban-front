/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["columns", "tasks"] }] */
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

const ColumnAction = {
  Insert: (columns, payload) => {
    columns[payload.id] = payload;
  },
  Delete: (columns, payload) => {
    const { deletedColumnId, updatedColumn } = payload;
    delete columns[deletedColumnId];
    if (updatedColumn) {
      columns[updatedColumn.id] = updatedColumn;
    }
  },
  Update: (columns, payload) => {
    columns[payload.id] = payload;
  },
  Reorder: (columns, payload) => {
    payload.forEach((value) => {
      if (columns[value.id] !== undefined) {
        columns[value.id] = value;
      }
    });
  },
};

const TaskAction = {
  Insert: (tasks, payload) => {
    payload.forEach((value) => {
      tasks[value.id] = value;
    });
  },
  Delete: (tasks, payload) => {
    const { deletedTaskId, updatedTask } = payload;
    delete tasks[deletedTaskId];
    if (updatedTask) {
      tasks[updatedTask.id] = updatedTask;
    }
  },
  Reorder: (tasks, payload) => {
    payload.forEach((value) => {
      if (tasks[value.id] !== undefined) {
        tasks[value.id] = value;
      }
    });
  },
  Update: (tasks, payload) => {
    tasks[payload.id] = payload;
  },
};

// store kanban data and apply kanban action to data
function KanbanDataStorage(initColumns, initTasks) {
  const columns = toObject(initColumns, "id");
  const tasks = toObject(initTasks, "id");

  function applyAction(action) {
    const { target, actionType, payload } = action;
    if (target === "Column") {
      if (ColumnAction[actionType] !== undefined) {
        ColumnAction[actionType](columns, payload);
      }
    } else if (target === "Task") {
      if (TaskAction[actionType] !== undefined) {
        TaskAction[actionType](tasks, payload);
      }
    }
  }

  function get() {
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
  }

  return Object.freeze({
    get,
    applyAction,
  });
}

export default KanbanDataStorage;
