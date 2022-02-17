import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import Dropdown from "components/layout/Dropdown";
import DropdownIcon from "public/icons/dropdown.svg";
import EditIcon from "public/icons/edit.svg";
import DeleteIcon from "public/icons/delete.svg";
import { CardIcon } from "components/layout/Icon";
import { ModalPortal } from "components/layout/Modal";
import EditTaskModal from "components/kanban/EditTaskModal";

const Container = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid #d8dee4;
  border-radius: 6px;
  padding: 12px 8px 12px 32px;

  margin-bottom: 10px;

  &:hover {
    box-shadow: 0 1px 3px rgb(106 115 125 / 30%) !important;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 12px;
  left: 10px;
`;

const DropdownWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 8px 0px 0px;
`;

const TextContainer = styled.div`
  margin-right: 26px;
  font-size: 14px;
  font-weight: 300;
  color: #24292f;
`;

const Text = styled.div`
  word-wrap: break-word;
  line-height: 1.2;
`;

const Task = ({ task, index, onDelete, onEdit }) => {
  const taskId = task.id.toString();
  const [isEditTaskOpen, setEditTaskOpen] = useState(false);

  const onDeleteButtonClick = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    onDelete(task);
  };

  const onEditButtonClick = () => {
    setEditTaskOpen(true);
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
            <Icon>
              <CardIcon />
            </Icon>
            <DropdownWrap>
              <Dropdown>
                <Dropdown.Toggle>
                  <DropdownIcon style={{ width: "1rem" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu position={{ right: "0" }}>
                  <Dropdown.Item onClick={onEditButtonClick}>
                    <EditIcon />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onDeleteButtonClick}>
                    <DeleteIcon />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </DropdownWrap>
            <TextContainer>
              <Text>{task.text}</Text>
            </TextContainer>
          </Container>
        )}
      </Draggable>
      <ModalPortal>
        <EditTaskModal
          show={isEditTaskOpen}
          setShow={setEditTaskOpen}
          task={task}
          onEdit={onEdit}
        />
      </ModalPortal>
    </>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    prevId: PropTypes.number,
    taskColumnId: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
