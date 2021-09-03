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

const monthTable = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getMonthString(month) {
  return monthTable[month];
}

function getDateString(str) {
  const date = new Date(str);
  return `${getMonthString(
    date.getMonth(),
  )} ${date.getDate()}, ${date.getFullYear()}`;
}

function getIndexOfId(arr, id) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
}

export {
  parseCookie,
  parseJwtClaims,
  getCookie,
  getMonthString,
  getDateString,
  getIndexOfId,
};
