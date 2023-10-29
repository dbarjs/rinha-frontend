const events = {
  parse: (payload) => {},
  "keys-count": (payload) => {
    console.info("keys-count", data);

    globalThis.jsonTree.setHeightByKeysCount(data);
  },
};

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
