import { useRef } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import ProjectHeader from "components/project/ProjectHeader";
import KanbanListItem from "components/kanban/KanbanListItem";
import { ContainerXL } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";

const NewKanbanButton = ({ projectId }) => {
  return (
    <Link href={`/projects/${projectId}/kanbans/new`}>
      <SuccessButton style={{ width: "120px" }}>New Kanban</SuccessButton>
    </Link>
  );
};

NewKanbanButton.propTypes = {
  projectId: PropTypes.string.isRequired,
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmptyKanban = styled.div`
  margin-top: 60px;
  text-align: center;
  color: #3e3e3e;
  & > * {
    font-weight: 500;
  }

  & > div:nth-child(1) {
    font-size: 24px;
    margin-bottom: 12px;
  }

  & > div:nth-child(2) {
    font-size: 18px;
    margin-bottom: 25px;
  }
`;

const KanbanList = ({ project, kanbanList }) => {
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef();

  return (
    <>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <ContainerXL>
        {kanbanList && kanbanList.length > 0 ? (
          <>
            <ButtonContainer>
              <div />
              <NewKanbanButton projectId={id} />
            </ButtonContainer>
            {kanbanList.map((kanban) => (
              <KanbanListItem
                key={kanban.sequenceId}
                kanban={kanban}
                innerRef={ref}
              />
            ))}
          </>
        ) : (
          <EmptyKanban>
            <div>No kanbans in this project!</div>
            <div>Create your first kanban</div>
            <NewKanbanButton projectId={id} />
          </EmptyKanban>
        )}
      </ContainerXL>
    </>
  );
};

KanbanList.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
  kanbanList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;
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
        requester.get(`/projects/${id}/kanbans`, token),
      ]);

      return {
        props: {
          project: projectResponse.data,
          kanbanList: kanbanResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(KanbanList);
