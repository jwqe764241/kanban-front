import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { getDateString } from "core/utils";

import EditIcon from "public/icons/edit.svg";
import DeleteIcon from "public/icons/delete.svg";
import Modal from "components/layout/Modal";
import EditTaskModal from "components/kanban/EditTaskModal";
import ContextMenu from "components/kanban/ContextMenu";

const Container = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.platinum};
  border-radius: 4px;

  &:hover {
    box-shadow: 0 1px 3px rgb(106 115 125 / 30%) !important;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const ContainerWrap = styled.div`
  padding: 0.875rem 1.25rem;
`;

const Text = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.gray};
  word-wrap: break-word;
  line-height: 1.25rem;
`;

const Date = styled.div`
  font-size: 0.75rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Task = ({ task, index, onDelete, onEdit }) => {
  const { id, text, createdAt } = task;
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
                <Date>{getDateString(createdAt)}</Date>
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
