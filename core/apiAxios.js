import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// request to get access token
// if refreshToken was given, update access token with given token
const getAccessToken = async (inst, refreshToken) => {
  const option = {
    withCredentials: true,
    ...(refreshToken && {
      headers: { Cookie: `REFRESH_TOKEN=${refreshToken}` },
    }),
  };

  try {
    const response = await inst.get("/auth/access-token", option);
    if (response.status === 200) {
      const { token } = response.data;
      return token;
    }
  } catch (e) {}

  return null;
};

// dispatch refreshed access token to redux store
// if refreshToken was given, update access token with given token
const updateAccessToken = async (inst, dispatch, refreshToken) => {
  const token = await getAccessToken(inst, refreshToken);
  const tokenWithBearer = token ? `Bearer ${token}` : null;
  dispatch({
    type: "UPDATE_TOKEN",
    payload: tokenWithBearer,
  });
  return tokenWithBearer;
};

// create server requester
// if refreshToken was given, update access token with given token
const createRequester = (inst, dispatch, refreshToken) => {
  return {
    get: async (url, token, option) => {
      let err;
      // try request.
      try {
        const res = await inst.get(url, {
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
        updatedToken = await updateAccessToken(inst, dispatch, refreshToken);
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
        updatedToken = await updateAccessToken(inst, dispatch, refreshToken);
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
    delete: async (url, token, option) => {
      let err;
      // try request.
      try {
        const res = await inst.delete(url, {
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
        updatedToken = await updateAccessToken(inst, dispatch, refreshToken);
      } else {
        throw err;
      }

      // retry with updated access token
      const res = await inst.delete(url, {
        ...option,
        headers: { Authorization: updatedToken },
      });
      return res;
    },
    patch: async (url, data, token, option) => {
      let err;
      // try request.
      try {
        const res = await inst.patch(url, data, {
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
        updatedToken = await updateAccessToken(inst, dispatch, refreshToken);
      } else {
        throw err;
      }

      // retry with updated access token
      const res = await inst.patch(url, data, {
        ...option,
        headers: { Authorization: updatedToken },
      });
      return res;
    },
  };
};

export default instance;

export { createRequester, updateAccessToken };
