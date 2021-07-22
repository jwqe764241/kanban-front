import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import Priority from "components/kanban/Priority";

const Container = styled.div`
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

const Tag = styled.div``;

const Content = styled.div`
  padding: 15px 0px;
  font-weight: 400;
`;

const Menus = styled.div``;

function Task(props) {
  const { task, index } = props;
  const { content } = task;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Tag>
            <Priority level="low" />
          </Tag>
          <Content>{content}</Content>
          <Menus />
        </Container>
      )}
    </Draggable>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
