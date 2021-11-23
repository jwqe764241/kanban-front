import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";
import { DropdownIcon, PlusIcon } from "components/layout/Icon";
import { ModalPortal } from "components/layout/Modal";
import { NoStyleButton } from "components/layout/Button";
import DeleteColumnModal from "components/kanban/DeleteColumnModal";
import EditColumnModal from "components/kanban/EditColumnModal";
import TaskList from "components/kanban/TaskList";
import Task from "components/kanban/Task";
import AddTaskForm from "components/kanban/AddTaskForm";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  background-color: #f6f8fa;
  margin-right: 20px;
`;

const HeaderContainer = styled.div`
  padding: 12px 10px;
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

const ButtonContainer = styled.span`
  display: flex;
  cursor: pointer;
  float: right;
`;

const TaskColumn = ({
  taskColumn,
  index,
  onDeleteColumn,
  onEditColumn,
  onCreateTask,
}) => {
  const { tasks } = taskColumn;
  const taskColumnId = taskColumn.id.toString();
  const [isDeleteColumnOpen, setDeleteColumnOpen] = useState(false);
  const [isEditColumnOpen, setEditColumnOpen] = useState(false);
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);

  const openDeleteColumnModal = () => {
    setDeleteColumnOpen(true);
  };

  const openEditColumnModal = () => {
    setEditColumnOpen(true);
  };

  const openAddTaskForm = () => {
    setAddTaskOpen(true);
  };

  const onAddTask = async (data) => {
    const response = await onCreateTask(taskColumn, data);
    return response;
  };

  return (
    <>
      <Draggable draggableId={`COLUMN-${taskColumnId}`} index={index}>
        {(provided) => (
          <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
            <HeaderContainer {...provided.dragHandleProps}>
              <Count>{tasks.length}</Count>
              <Title>{taskColumn.name}</Title>
              <ButtonContainer>
                <NoStyleButton
                  style={{ display: "flex" }}
                  onClick={openAddTaskForm}
                >
                  <PlusIcon />
                </NoStyleButton>
                <DropdownMenu icon={<DropdownIcon />}>
                  <DropdownButton type="button" onClick={openEditColumnModal}>
                    Edit column
                  </DropdownButton>
                  <DropdownButton type="button" onClick={openDeleteColumnModal}>
                    Delete column
                  </DropdownButton>
                </DropdownMenu>
              </ButtonContainer>
            </HeaderContainer>
            {isAddTaskOpen ? (
              <AddTaskForm onAddTask={onAddTask} setShow={setAddTaskOpen} />
            ) : (
              <></>
            )}
            <TaskList droppableId={taskColumnId}>
              {tasks.map((task, arrIndex) => (
                <Task key={task.id} task={task} index={arrIndex} />
              ))}
            </TaskList>
          </ColumnContainer>
        )}
      </Draggable>
      <ModalPortal>
        <EditColumnModal
          show={isEditColumnOpen}
          setShow={setEditColumnOpen}
          taskColumn={taskColumn}
          onEdit={onEditColumn}
        />
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
    tasks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  index: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleteColumn: PropTypes.func.isRequired,
  onEditColumn: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
};

TaskColumn.defaultProps = {
  tasks: [],
};

export default TaskColumn;
