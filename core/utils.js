import cookie from "js-cookie";

// parse cookie string
export function parseCookie(str) {
  if (!str || !(typeof str === "string")) {
    return {};
  }
  return Object.fromEntries(
    str.split("; ").map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent)),
  );
}

// get cookies from browser
function getCookieFromBrowser(key) {
  cookie.get(key);
}

// get cookies from request
function getCookieFromServer(key, req) {
  if (!req.headers.cookie) {
    return null;
  }
  const cookies = parseCookie(req.headers.cookie);
  return cookies[key];
}

// return cookies
// if req is exist, get cookie from request.
// and if not, get cookie from browser
export function getCookie(key, req) {
  if (!req) {
    return getCookieFromBrowser(key);
  }
  return getCookieFromServer(key, req);
}

// return parsed jwt claims
export function parseJwtClaims(token) {
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

// return month string
export function getMonthString(month) {
  return monthTable[month];
}

// return formatted date string "MMM DD YYY"
export function getDateString(str) {
  const date = new Date(str);
  return `${getMonthString(
    date.getMonth(),
  )} ${date.getDate()}, ${date.getFullYear()}`;
}

// return padded number
function pad(num, size) {
  const s = `000000000${num}`;
  return s.substr(s.length - size);
}

// return formatted datetime string "YYYY-MM-DD HH-mm-ss"
export function getDateTimeString(str) {
  const date = new Date(str);
  const m = pad(date.getMonth() + 1, 2);
  const d = pad(date.getDate(), 2);
  return `${date.getFullYear()}-${m}-${d} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// convert array to object
export function toObject(arr, key) {
  if (!Array.isArray(arr)) {
    return {};
  }
  return arr.reduce((acc, current) => {
    if (current[key] !== undefined) {
      acc[current[key]] = current;
    }
    return acc;
  }, {});
}

// map values in obj
export function objMap(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      return [k, func(v)];
    }),
  );
}

// group elements by key
export function group(arr, key) {
  // eslint-disable-next-line func-names
  return arr.reduce((acc, current) => {
    const kv = current[key];
    if (acc[kv] === undefined) {
      acc[kv] = [];
    }
    acc[kv].push(current);
    return acc;
  }, {});
}
