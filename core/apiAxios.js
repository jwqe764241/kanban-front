import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000,
});

// request to get access token
const getAccessToken = async (inst, option) => {
  try {
    const response = await inst.post("auth/refresh-access-token", null, {
      withCredentials: true,
      ...option,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {}

  return null;
};

// dispatch refreshed access token to redux store
const updateAccessToken = async (inst, dispatch, option) => {
  const token = await getAccessToken(inst, option);
  dispatch({
    type: "UPDATE_TOKEN",
    payload: token,
  });
  return token;
};

// create server requester
const createRequester = (inst, dispatch) => {
  return {
    get: async (url, option, token) => {
      let err;
      // try request.
      try {
        const res = await inst.get(url, {
          ...option,
          headers: { Authorization: token },
        });
        return res;
      } catch (e) {
        err = e.response;
      }

      // if err status is 401, update access token
      let updatedToken;
      const errRes = err.response;
      if (errRes && errRes.status === 401) {
        updatedToken = await updateAccessToken(inst, dispatch);
      } else {
        throw err;
      }

      // retry with updated access token
      const res = await inst.get(url, {
        ...option,
        headers: { Authorization: updatedToken },
      });
      return res;
    },
    post: async (url, data, token, option) => {
      let err;
      // try request.
      try {
        const res = await inst.post(url, data, {
          ...option,
          headers: { Authorization: token },
        });
        return res;
      } catch (e) {
        err = e;
      }

      // if err status is 401, update access token
      let updatedToken;
      const errRes = err.response;
      if (errRes && errRes.status === 401) {
        updatedToken = await updateAccessToken(inst, dispatch);
      } else {
        throw err;
      }

      // retry with updated access token
      const res = await inst.post(url, data, {
        ...option,
        headers: { Authorization: updatedToken },
      });
      return res;
    },
  };
};

export default instance;

export { createRequester, updateAccessToken };
