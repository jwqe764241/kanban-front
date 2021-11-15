import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { DropdownIcon } from "components/layout/Icon";
import DeleteColumnModal from "components/kanban/DeleteColumnModal";
import { ModalPortal } from "components/layout/Modal";

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

const TaskColumn = ({ taskColumn, index, tasks, onDeleteColumn, innerRef }) => {
  const count = tasks.length;
  const [isDeleteColumnOpen, setDeleteColumnOpen] = useState(false);

  const openDeleteColumnModal = () => {
    setDeleteColumnOpen(true);
  };

  return (
    <>
      <Draggable draggableId={taskColumn.id.toString()} index={index}>
        {(provided) => (
          <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
            <TitleContainer {...provided.dragHandleProps}>
              <Count>{count}</Count>
              <Title>{taskColumn.name}</Title>
              <DropdownWrap>
                <DropdownMenu icon={<DropdownIcon />} innerRef={innerRef}>
                  <DropdownButton type="button" onClick={openDeleteColumnModal}>
                    Delete Column
                  </DropdownButton>
                </DropdownMenu>
              </DropdownWrap>
            </TitleContainer>
          </ColumnContainer>
        )}
      </Draggable>
      <ModalPortal>
        <DeleteColumnModal
          show={isDeleteColumnOpen}
          setShow={setDeleteColumnOpen}
          taskColumn={taskColumn}
          onDelete={onDeleteColumn}
        />
      </ModalPortal>
    </>
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
  onDeleteColumn: PropTypes.func.isRequired,
  innerRef: PropTypes.object.isRequired,
};

TaskColumn.defaultProps = {
  tasks: [],
};

export default TaskColumn;
