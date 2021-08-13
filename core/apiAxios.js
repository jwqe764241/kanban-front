import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000,
});

const refreshAccessToken = async (axiosInstance, dispatch) => {
  const response = await axiosInstance.post("auth/refresh-access-token", null, {
    withCredentials: true,
  });

  if (response.status === 200) {
    const token = response.data;
    dispatch({
      type: "UPDATE",
      payload: token,
    });
    return token;
  }
};

const createRequester = (axiosInstance, dispatch) => {
  return {
    get: async (url, option, token) => {
      try {
        // try reqeust with given token
        const response = await axiosInstance.get(url, {
          ...option,
          headers: { Authorization: `${token}` },
        });
        return response;
      } catch (e) {
        const errorResponse = e.response;
        // if token is invalid, refresh access token and try again
        if (errorResponse && errorResponse.status === 401) {
          const refreshedToken = await refreshAccessToken(
            axiosInstance,
            dispatch,
          );
          const response = await axiosInstance.get(url, {
            ...option,
            headers: { Authorization: `${refreshedToken}` },
          });
          return response;
        }
      }
    },
    post: async (url, data, option, token) => {
      try {
        // try reqeust with given token
        const response = await axiosInstance.post(url, data, {
          ...option,
          headers: { Authorization: `${token}` },
        });
        return response;
      } catch (e) {
        const errorResponse = e.response;
        // if token is invalid, refresh access token and try again
        if (errorResponse && errorResponse.status === 401) {
          const refreshedToken = await refreshAccessToken(
            axiosInstance,
            dispatch,
          );
          const response = await axiosInstance.post(url, data, {
            ...option,
            headers: { Authorization: `${refreshedToken}` },
          });
          return response;
        }
      }
    },
  };
};

export default instance;

export { createRequester };
