import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const Wrap = styled.div`
  display: inline-block;
  width: 350px;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  background-color: #f6f8fa;
  margin-right: 20px;
`;

const ColumnMenu = styled.div`
  padding: 15px 10px;
  font-size: 14px;
  font-weight: 500;
`;

const Count = styled.span`
  padding: 0px 10px 0px 5px;
  margin-left: 2px;
`;

const Title = styled.div`
  display: inline-block;
`;

const TaskColumn = ({ taskColumn, index, tasks }) => {
  const count = tasks.length;

  return (
    <Draggable draggableId={taskColumn.id.toString()} index={index}>
      {(provided) => (
        <Wrap {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnMenu {...provided.dragHandleProps}>
            <Count>{count}</Count>
            <Title>{taskColumn.name}</Title>
          </ColumnMenu>
        </Wrap>
      )}
    </Draggable>
  );
};

TaskColumn.propTypes = {
  taskColumn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    prevId: PropTypes.number,
    registerDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

TaskColumn.defaultProps = {
  tasks: [],
};

export default TaskColumn;
