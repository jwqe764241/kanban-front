import { parseCookie } from "core/utils";
import axios from "core/apiAxios";

const Logout = () => {
  return <></>;
};

export const getServerSideProps = async (context) => {
  const cookies = parseCookie(context.req.headers.cookie);
  const response = await axios.post("/auth/sign-out", null, {
    withCredentials: true,
    headers: { Cookie: `REFRESH_TOKEN=${cookies.REFRESH_TOKEN}` },
  });

  context.res.setHeader("set-cookie", response.headers["set-cookie"]);

  if (response.status === 200) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/500",
      permanent: false,
    },
  };
};

export default Logout;
