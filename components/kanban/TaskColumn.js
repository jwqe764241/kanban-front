import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import Dropdown from "components/layout/Dropdown";
import DropdownIcon from "public/icons/dropdown.svg";
import EditIcon from "public/icons/edit.svg";
import DeleteIcon from "public/icons/delete.svg";
import PlusIcon from "public/icons/plus.svg";
import Modal from "components/layout/Modal";
import { NoStyleButton } from "components/layout/Button";
import DeleteColumnModal from "components/kanban/DeleteColumnModal";
import EditColumnModal from "components/kanban/EditColumnModal";
import TaskList from "components/kanban/TaskList";
import Task from "components/kanban/Task";
import AddTaskForm from "components/kanban/AddTaskForm";

const Container = styled.div`
  width: 320px;
  margin-right: 1rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 4px;
`;

const Header = styled.div`
  padding: 1rem 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkgray70};
`;

const Name = styled.span`
  font-weight: 600;
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.span`
  display: flex;
  cursor: pointer;
  float: right;
`;

const AddTaskButton = styled(NoStyleButton)`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.darkgray40};
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.darkgray70};
  }

  & > svg {
    width: 1em;
    height: 1em;
    margin-right: 0.5rem;
    fill: currentColor;
  }
`;

const TaskColumn = ({
  taskColumn,
  index,
  onDeleteColumn,
  onEditColumn,
  onCreateTask,
  onDeleteTask,
  onEditTask,
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

  return (
    <>
      <Draggable draggableId={`column-${taskColumnId}`} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Wrap>
              <Header {...provided.dragHandleProps}>
                <Name>{taskColumn.name}</Name>
                <ButtonContainer>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <DropdownIcon style={{ width: "1rem" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu position={{ right: "0" }}>
                      <Dropdown.Item onClick={openEditColumnModal}>
                        <EditIcon />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={openDeleteColumnModal}>
                        <DeleteIcon />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonContainer>
              </Header>
              <AddTaskForm
                taskColumn={taskColumn}
                onAddTask={onCreateTask}
                show={isAddTaskOpen}
                setShow={setAddTaskOpen}
              />
              <TaskList
                droppableId={taskColumnId}
                empty={!(tasks && tasks.length > 0)}
              >
                {tasks.map((task, arrIndex) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={arrIndex}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                  />
                ))}
              </TaskList>
              <AddTaskButton onClick={openAddTaskForm}>
                <PlusIcon />
                <div>
                  {tasks && tasks.length > 0
                    ? "Add another task"
                    : "Add a task"}
                </div>
              </AddTaskButton>
            </Wrap>
          </Container>
        )}
      </Draggable>
      <Modal.Portal>
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
      </Modal.Portal>
    </>
  );
};

TaskColumn.propTypes = {
  taskColumn: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    prevId: PropTypes.number,
    createdAt: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  index: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleteColumn: PropTypes.func.isRequired,
  onEditColumn: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

TaskColumn.defaultProps = {
  tasks: [],
};

export default TaskColumn;
