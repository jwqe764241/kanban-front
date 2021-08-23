// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const reducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        token: action.payload.token ? action.payload.token : state.token,
      };
    case "UPDATE_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const makeStore = () => createStore(reducer);

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
