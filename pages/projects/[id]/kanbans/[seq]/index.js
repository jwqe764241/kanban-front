import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios, { createRequester } from "core/apiAxios";
import { useSelector, useDispatch, connect } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { Helper } from "core/kanbanUtils";

import ProjectHeader from "components/project/ProjectHeader";
import TaskColumn from "components/kanban/TaskColumn";
import { NoStyleButton, SuccessButton } from "components/layout/Button";
import { ModalPortal } from "components/layout/Modal";
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

const AddColumnButton = styled(NoStyleButton)`
  width: 300px;
  height: 120px;
  color: #5f5f5f;
  border: 1px solid #d8dee4;
  border-style: dashed;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

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

const Kanban = ({ project, kanban, taskColumns }) => {
  const ref = useRef();
  const client = useRef(null);
  const helper = useRef(null);
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isAddColumnOpen, setAddColumnOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [columns, setColumns] = useState([]);

  resetServerContext();

  useEffect(() => {
    helper.current = Helper(taskColumns);
    setColumns(helper.current.get());

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
        Authorization: authToken,
      },
      reconnectDelay: 0,
      webSocketFactory: () => {
        return new SockJS("http://localhost:8080/kanban-event");
      },
      onConnect: () => {
        client.current.subscribe(
          `/topic/kanban/${kanban.sequenceId}`,
          (message) => {
            const action = JSON.parse(message.body);
            helper.current.applyAction(action);
            setColumns(helper.current.get());
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

  return (
    <>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <KanbanInfo>
        <KanbanName>{kanban.name}</KanbanName>
      </KanbanInfo>
      <KanbanContainer>
        {taskColumns && taskColumns.length > 0 ? (
          <DragDropContext>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  style={{ display: "flex" }}
                  {...provided.droppableProps}
                >
                  {columns.map((data, index) => (
                    <TaskColumn
                      key={data.id}
                      taskColumn={data}
                      index={index}
                      innerRef={ref}
                    />
                  ))}
                  {provided.placeholder}
                  <AddColumnButton onClick={openAddColumnModal}>
                    Add column
                  </AddColumnButton>
                </div>
              )}
            </Droppable>
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
      <ModalPortal>
        <AddColumnModal
          show={isAddColumnOpen}
          setShow={setAddColumnOpen}
          onCreate={onColumnCreate}
        />
      </ModalPortal>
    </>
  );
};

Kanban.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
  kanban: PropTypes.shape({
    projectId: PropTypes.number,
    sequenceId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
  taskColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      const [projectResponse, kanbanResponse, taskColumnsResponse] =
        await Promise.all([
          requester.get(`/projects/${id}`, token),
          requester.get(`/projects/${id}/kanbans/${seq}`, token),
          requester.get(`/projects/${id}/kanbans/${seq}/columns`, token),
        ]);

      if (
        projectResponse.status === 200 &&
        kanbanResponse.status === 200 &&
        taskColumnsResponse.status === 200
      ) {
        return {
          props: {
            project: projectResponse.data,
            kanban: kanbanResponse.data,
            taskColumns: taskColumnsResponse.data,
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
