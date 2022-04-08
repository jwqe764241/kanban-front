import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import EditIcon from "public/icons/edit.svg";
import DeleteIcon from "public/icons/delete.svg";
import Modal from "components/layout/Modal";
import EditTaskModal from "components/kanban/EditTaskModal";
import ContextMenu from "components/kanban/ContextMenu";

const Container = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const ContainerWrap = styled.div`
  padding: 0.75rem 1rem;
`;

const Text = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  word-wrap: break-word;
  line-height: 1.25rem;
`;

const Task = ({ task, index, onDelete, onEdit }) => {
  const { id, text } = task;
  const taskId = id.toString();
  const [isEditTaskOpen, setEditTaskOpen] = useState(false);

  const onEditClick = () => {
    setEditTaskOpen(true);
  };

  const onDeleteClick = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    onDelete(task);
  };

  return (
    <>
      <Draggable draggableId={`task-${taskId}`} index={index}>
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ContextMenu.Trigger>
              <ContainerWrap>
                <Text>{text}</Text>
              </ContainerWrap>
              <ContextMenu.Menu id="context-root">
                <ContextMenu.Item onClick={onEditClick}>
                  <EditIcon />
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item onClick={onDeleteClick}>
                  <DeleteIcon />
                  Delete
                </ContextMenu.Item>
              </ContextMenu.Menu>
            </ContextMenu.Trigger>
          </Container>
        )}
      </Draggable>
      <Modal.Portal>
        <EditTaskModal
          show={isEditTaskOpen}
          setShow={setEditTaskOpen}
          task={task}
          onEdit={onEdit}
        />
      </Modal.Portal>
    </>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    prevId: PropTypes.number,
    taskColumnId: PropTypes.number,
    text: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
