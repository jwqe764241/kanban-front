import { connect } from "react-redux";
import PropTypes from "prop-types";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

import ProjectHeader from "components/project/ProjectHeader";

const Kanbans = ({ project }) => {
  return (
    <>
      <ProjectHeader project={project} activeMenu="kanbans" />
      <div>xcvxcvxcvxcv</div>
    </>
  );
};

Kanbans.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    registerUsername: PropTypes.string,
    registerDate: PropTypes.string,
  }).isRequired,
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
      const response = await requester.get(`/projects/${id}`, token);
      return {
        props: {
          project: response.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(Kanbans);
