function parseCookie(str) {
  if (!str || !(typeof str === "string")) return {};

  return Object.fromEntries(
    str.split("; ").map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent)),
  );
}

export { parseCookie };
