export function getOrderedColumn(columns) {
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

export const Helper = (initColumns) => {
  const columns = {};
  initColumns.forEach((value) => {
    columns[value.id] = value;
  });

  const applyColumnAction = (actionType, payload) => {
    if (actionType === "Insert") {
      columns[payload.id] = payload;
    }
  };

  const applyTaskAction = (actionType, payload) => {};

  return {
    get: () => {
      return getOrderedColumn(Object.values(columns));
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
