import { toFlatValue } from "../utils/toFlatValue.mjs";

globalThis.parentId = "";
globalThis.partialResult = [];
globalThis.next = [];
globalThis.idleWorkers = [];

function getFlatterWorker(name = "flatter") {
  const worker = new Worker("/js/workers/flatter.mjs", {
    name,
    type: "module",
  });

  const messages = {
    "flat-result": (payload) => {
      dispatch(payload[2]);
      processFlatResult(payload[1]);
    },
  };

  worker.onmessage = function (event) {
    const eventType = event.data?.type;

    if (eventType in messages) {
      messages[eventType](event.data.data);

      return;
    }
  };

  return worker;
}

const workers = [];

function dispatch(workerId) {
  const next = globalThis.next.pop();

  if (!next) {
    console.warn("No more data to dispatch.", workerId);

    globalThis.idleWorkers.push(workerId);
    return;
  }

  workers[workerId].postMessage({
    type: "flat-worker",
    data: [next[0], next[1], workerId],
  });
}

function dispatchWorkers() {
  if (!workers.length) {
    workers.push(getFlatterWorker("0"));
    idleWorkers.push(0);

    workers.push(getFlatterWorker("1"));
    idleWorkers.push(1);

    workers.push(getFlatterWorker("2"));
    idleWorkers.push(2);

    workers.push(getFlatterWorker("3"));
    idleWorkers.push(3);

    workers.push(getFlatterWorker("4"));
    idleWorkers.push(4);

    workers.push(getFlatterWorker("5"));
    idleWorkers.push(5);

    workers.push(getFlatterWorker("6"));
    idleWorkers.push(6);

    workers.push(getFlatterWorker("7"));
    idleWorkers.push(7);

    workers.push(getFlatterWorker("8"));
    idleWorkers.push(8);

    workers.push(getFlatterWorker("9"));
    idleWorkers.push(9);

    workers.push(getFlatterWorker("10"));
    idleWorkers.push(10);
  }

  idleWorkers.forEach((workerId) => {
    dispatch(workerId);
  });

  globalThis.idleWorkers = [];
}

function processFlatResult(result) {
  result[0].forEach((entry) => {
    globalThis.partialResult.push(entry);
  });

  if (result[1].length) {
    result[1].forEach((entry) => {
      globalThis.next.push(entry);
    });
  }

  if (globalThis.next.length) {
    dispatchWorkers();

    return;
  }

  postMessage({
    type: "flat-result",
    data: [globalThis.parentId, globalThis.partialResult],
  });
}

const messages = {
  flat: (payload) => {
    globalThis.parentId = payload[0];

    const result = toFlatValue(payload[1], globalThis.parentId);

    processFlatResult(result);

    setInterval(() => {
      console.debug(
        "next",
        globalThis.next.length,
        globalThis.idleWorkers.length,
        globalThis.partialResult.length
      );
    }, 2000);
  },
  "flat-worker": (payload) => {
    const result = toFlatValue(payload[1], payload[0]);

    postMessage({
      type: "flat-result",
      data: [payload[0], result, payload[2]],
    });
  },
};

onmessage = function (event) {
  const eventType = event.data?.type;

  if (eventType in messages) {
    messages[eventType](event.data.data);

    return;
  }
};
