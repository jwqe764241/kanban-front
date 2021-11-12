import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { DropdownIcon } from "components/layout/Icon";

const ColumnContainer = styled.div`
  display: inline-block;
  width: 350px;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  background-color: #f6f8fa;
  margin-right: 20px;
`;

const TitleContainer = styled.div`
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

const DropdownWrap = styled.span`
  cursor: pointer;
  float: right;
`;

const TaskColumn = ({ taskColumn, index, tasks, innerRef }) => {
  const count = tasks.length;

  return (
    <Draggable draggableId={taskColumn.id.toString()} index={index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer {...provided.dragHandleProps}>
            <Count>{count}</Count>
            <Title>{taskColumn.name}</Title>
            <DropdownWrap>
              <DropdownMenu icon={<DropdownIcon />} innerRef={innerRef}>
                <DropdownButton type="button">Delete</DropdownButton>
              </DropdownMenu>
            </DropdownWrap>
          </TitleContainer>
        </ColumnContainer>
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
  innerRef: PropTypes.object.isRequired,
};

TaskColumn.defaultProps = {
  tasks: [],
};

export default TaskColumn;
