import { connect } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import wrapper from "core/store";
import { parseCookie, getDateString } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import ProjectHeader from "components/project/ProjectHeader";
import { ContainerXL } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KanbanInfo = styled.div`
  padding: 24px 0px;
  border-bottom: 1px solid #e1e4e8;
  color: #212427;

  &:first-child {
    padding-top: 0px;
  }
`;

const KanbanName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #2455e7;
  margin-bottom: 10px;
  cursor: pointer;

  &: hover {
    text-decoration: underline;
  }
`;

const KanbanDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #484848;
`;

const RegisterDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
  color: #6a737d;
`;

const KanbanList = ({ project, kanbanList }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <ContainerXL>
        <Container>
          <div />
          <Link href={`/projects/${id}/kanbans/new`}>
            <SuccessButton style={{ width: "120px" }}>New Kanban</SuccessButton>
          </Link>
        </Container>
        {kanbanList.map(
          ({ projectId, sequenceId, name, description, registerDate }) => (
            <KanbanInfo key={sequenceId}>
              <Link href={`/projects/${projectId}/kanbans/${sequenceId}`}>
                <KanbanName>{name}</KanbanName>
              </Link>
              <KanbanDescription>{description}</KanbanDescription>
              <RegisterDate>{getDateString(registerDate)}</RegisterDate>
            </KanbanInfo>
          ),
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
      console.log(e);
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(KanbanList);
