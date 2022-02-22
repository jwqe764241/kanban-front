import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch, connect } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import KanbanDataStorage from "core/kanban-data-storage";

import ProjectHeader from "components/project/ProjectHeader";
import TaskColumnList from "components/kanban/TaskColumnList";
import TaskColumn from "components/kanban/TaskColumn";
import { PlusIcon } from "components/layout/Icon";
import { NoStyleButton, SuccessButton } from "components/layout/Button";
import Modal from "components/layout/Modal";
import AddColumnModal from "components/kanban/AddColumnModal";

const KanbanInfo = styled.div`
  padding: 20px 20px 0px 20px;
`;

const KanbanName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #212427;
`;

const KanbanContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 20px 15px;
  overflow-x: auto;
  color: #212427;
`;

const DashedButton = styled(NoStyleButton)`
  width: 300px;
  display: inline-block;
  color: #5f5f5f;
  border: 1px solid #d8dee4;
  border-style: dashed;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 40px 0px;

  &:hover {
    text-decoration: underline;
  }
`;

const AddColumnButton = ({ onClick }) => {
  return (
    <div>
      <DashedButton onClick={onClick}>
        <PlusIcon
          style={{
            marginRight: "5px",
            fill: "#5f5f5f",
            verticalAlign: "text-bottom",
          }}
        />
        Add column
      </DashedButton>
    </div>
  );
};

AddColumnButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const EmptyColumn = styled.div`
  width: 100%;
  text-align: center;

  & > div:nth-child(1) {
    margin-top: 50px;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const Kanban = ({ project, kanban }) => {
  const client = useRef(null);
  const dataStorage = useRef(null);
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isAddColumnOpen, setAddColumnOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [columns, setColumns] = useState([]);

  resetServerContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const [columnResponse, taskResponse] = await Promise.all([
          requester.get(
            `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns`,
            token,
          ),
          requester.get(
            `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/tasks`,
            token,
          ),
        ]);
        if (columnResponse.status === 200 && taskResponse.status === 200) {
          dataStorage.current = KanbanDataStorage(
            columnResponse.data,
            taskResponse.data,
          );
          setColumns(dataStorage.current.get());
        }
      } catch (e) {
        alert("can't get data");
      }
    };
    getData();

    if (!authToken) {
      const getAuthToken = async () => {
        try {
          const result = await axios.get("/auth/ws-token", {
            withCredentials: true,
          });
          if (result.status === 200) {
            setAuthToken(result.data.token);
          }
        } catch (e) {
          alert("can't get token for websocket");
        }
      };
      getAuthToken();
    }
  }, []);

  if (!client.current && authToken) {
    client.current = new Client({
      connectHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
      reconnectDelay: 0,
      webSocketFactory: () => {
        return new SockJS(`${process.env.API_BASE_URL}kanban-event`);
      },
      onConnect: () => {
        client.current.subscribe(
          `/topic/project/${project.id}/kanban/${kanban.sequenceId}`,
          (message) => {
            const action = JSON.parse(message.body);
            dataStorage.current.applyAction(action);
            setColumns(dataStorage.current.get());
          },
        );
      },
      onWebSocketClose: (error) => {
        console.log(error);
      },
    });
    client.current.activate();
  }

  const openAddColumnModal = () => {
    setAddColumnOpen(true);
  };

  const onColumnCreate = async (data) => {
    try {
      const response = await requester.post(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns`,
        data,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onDeleteColumn = async (taskColumn) => {
    try {
      const response = await requester.delete(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${taskColumn.id}`,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onEditColumn = async (taskColumn, data) => {
    try {
      const response = await requester.patch(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${taskColumn.id}`,
        data,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onCreateTask = async (taskColumn, data) => {
    try {
      const response = await requester.post(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${taskColumn.id}/tasks`,
        data,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onDeleteTask = async (task) => {
    try {
      const response = await requester.delete(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${task.taskColumnId}/tasks/${task.id}`,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onEditTask = async (task, data) => {
    try {
      const response = await requester.patch(
        `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${task.taskColumnId}/tasks/${task.id}`,
        data,
        token,
      );
      return response;
    } catch (e) {
      const { response } = e;
      return response;
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    // drop at same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      // update client state first
      const state = [...columns];
      const newState = [...state];
      const removed = newState.splice(source.index, 1);
      newState.splice(destination.index, 0, removed[0]);
      setColumns(newState);

      // send reorder reqeust to server
      const columnId = parseInt(draggableId.split("-")[1], 10);
      const destColumn = columns[destination.index];
      const reorderData = {
        columnId,
        prevColumnId:
          source.index < destination.index ? destColumn.id : destColumn.prevId,
      };
      try {
        await requester.post(
          `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/reorder`,
          reorderData,
          token,
        );
      } catch (e) {
        setColumns(state);
      }
    } else if (type === "task") {
      const destColumn = columns.find(
        (e) => e.id === parseInt(destination.droppableId, 10),
      );
      const taskId = parseInt(draggableId.split("-")[1], 10);

      if (!destColumn || !taskId) {
        return;
      }

      const reorderData = {
        taskId,
      };
      // reorder in same column
      if (destination.droppableId === source.droppableId) {
        const destTask = destColumn.tasks[destination.index];
        reorderData.prevTaskId =
          source.index < destination.index ? destTask.id : destTask.prevId;
      }
      // move to other column, but there's no tasks. so move to other column as first element
      else if (destColumn.tasks.length < 1) {
        reorderData.prevTaskId = null;
      }
      // move to other column as last element
      else if (destColumn.tasks.length === destination.index) {
        const destTask = destColumn.tasks[destColumn.tasks.length - 1];
        reorderData.prevTaskId = destTask.id;
      }
      // move to other column
      else {
        const destTask = destColumn.tasks[destination.index];
        reorderData.prevTaskId = destTask.prevId;
      }

      // update client state
      const state = [...columns];
      const newState = [...state];
      const removed = newState
        .find((column) => column.id === parseInt(source.droppableId, 10))
        .tasks.splice(source.index, 1);
      newState
        .find((column) => column.id === parseInt(destination.droppableId, 10))
        .tasks.splice(destination.index, 0, removed[0]);
      setColumns(newState);

      try {
        await requester.post(
          `/projects/${project.id}/kanbans/${kanban.sequenceId}/columns/${destColumn.id}/reorder`,
          reorderData,
          token,
        );
      } catch (e) {
        setColumns(state);
      }
    }
  };

  return (
    <>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <KanbanInfo>
        <KanbanName>{kanban.name}</KanbanName>
      </KanbanInfo>
      <KanbanContainer>
        {columns && columns.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <TaskColumnList>
              {columns.map((data, index) => (
                <TaskColumn
                  key={data.id}
                  taskColumn={data}
                  index={index}
                  onDeleteColumn={onDeleteColumn}
                  onEditColumn={onEditColumn}
                  onCreateTask={onCreateTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
            </TaskColumnList>
            <AddColumnButton onClick={openAddColumnModal} />
          </DragDropContext>
        ) : (
          <EmptyColumn>
            <div>Add your first columns!</div>
            <SuccessButton
              style={{ width: "110px" }}
              onClick={openAddColumnModal}
            >
              Add column
            </SuccessButton>
          </EmptyColumn>
        )}
      </KanbanContainer>
      <Modal.Portal>
        <AddColumnModal
          show={isAddColumnOpen}
          setShow={setAddColumnOpen}
          onCreate={onColumnCreate}
        />
      </Modal.Portal>
    </>
  );
};

Kanban.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id, seq } = context.query;
    const cookies = parseCookie(context.req.headers.cookie);
    const requester = createRequester(
      axios,
      store.dispatch,
      cookies.REFRESH_TOKEN,
    );

    const { token } = store.getState();
    try {
      const [projectResponse, kanbanResponse] = await Promise.all([
        requester.get(`/projects/${id}`, token),
        requester.get(`/projects/${id}/kanbans/${seq}`, token),
      ]);

      if (projectResponse.status === 200 && kanbanResponse.status === 200) {
        return {
          props: {
            project: projectResponse.data,
            kanban: kanbanResponse.data,
          },
        };
      }
    } catch (e) {
      return {
        notFound: true,
      };
    }

    return {
      notFound: true,
    };
  },
);

export default connect((state) => state)(Kanban);
