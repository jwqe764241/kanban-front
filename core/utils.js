import cookie from "js-cookie";

function parseCookie(str) {
  if (!str || !(typeof str === "string")) return {};

  return Object.fromEntries(
    str.split("; ").map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent)),
  );
}

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) return null;
  const cookies = parseCookie(req.headers.cookie);
  return cookies[key];
};

const getCookie = (key, req) => {
  if (!req) return getCookieFromBrowser(key);
  return getCookieFromServer(key, req);
};

function parseJwtClaims(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
}

export { parseCookie, parseJwtClaims, getCookie };
