"use strict";

globalThis.parsedData = null;
globalThis.keysCount = 0;
globalThis.isCreated = false;

function parse(data) {
  try {
    globalThis.parsedData = JSON.parse(data);
    globalThis.keys = 0;

    postMessage({
      type: "parse-result",
      data: "success",
    });
  } catch {
    postMessage({
      type: "parse-result",
      data: "error",
    });
  }
}

function getKeys(obj, keysCount) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  globalThis.keysCount += Object.keys(obj).length;

  return Object.values(obj).forEach((value) => {
    getKeys(value, keysCount);
  });
}

const windowMap = new Map();

windowMap.set("parse", (data) => {
  parse(data);

  const keysCount = 0;
  getKeys(globalThis.parsedData, globalThis.keysCount);
});
windowMap.set("created", (data) => {
  globalThis.isCreated = true;

  postMessage({
    type: "keys-count",
    data: globalThis.keysCount,
  });
});

onmessage = function (event) {
  const type = event.data?.type;

  if (windowMap.has(type)) {
    windowMap.get(type)(event.data.data);

    return;
  }
};
