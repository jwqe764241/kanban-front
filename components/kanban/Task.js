import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { CardIcon, DropdownIcon } from "components/layout/Icon";
import { DropdownMenu, DropdownButton } from "components/layout/Dropdown";

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

const Task = ({ task, index, onDelete }) => {
  const taskId = task.id.toString();

  const onDeleteButtonClick = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    onDelete(task);
  };

  return (
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
            <DropdownMenu icon={<DropdownIcon />}>
              <DropdownButton type="button" onClick={onDeleteButtonClick}>
                Delete task
              </DropdownButton>
            </DropdownMenu>
          </DropdownWrap>
          <TextContainer>
            <Text>{task.text}</Text>
          </TextContainer>
        </Container>
      )}
    </Draggable>
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
};

export default Task;
