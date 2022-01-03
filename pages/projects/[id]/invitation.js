import { connect } from "react-redux";
import wrapper from "core/store";
import { parseCookie } from "core/utils";
import axios, { createRequester } from "core/apiAxios";

const Invitation = () => {
  return <></>;
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
      await requester.post(
        `/projects/${id}/members/accept-invitation`,
        null,
        token,
      );
      return {
        redirect: {
          destination: `/projects/${id}/kanbans`,
          permanent: false,
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }
  },
);

export default connect((state) => state)(Invitation);
