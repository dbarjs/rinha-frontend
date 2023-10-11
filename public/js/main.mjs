"use strict";

import {
  appElement,
  fileInputElement,
  loadJsonButtonElement,
} from "/js/elements.mjs";
import { readFile } from "/js/utils.mjs";
import { JsonView } from "/js/JsonView.mjs";

function getParserWorker() {
  if (!window.Worker) {
    console.error("Your browser doesn't support web workers.");
    return;
  }

  const worker = new Worker("/js/worker.js");

  return worker;
}

globalThis.parserWorker = getParserWorker();

export const workerEvents = new Map();

workerEvents.set("parse-result", (data) => {
  if (data === "success") {
    appElement.classList.remove("hasError");
    globalThis.jsonView = new JsonView();

    globalThis.parserWorker.postMessage({
      type: "created",
    });
  } else {
    appElement.classList.add("hasError");
  }
});
workerEvents.set("keys-count", (data) => {
  console.info("keys-count", data);

  globalThis.jsonView.setHeightByKeysCount(data);
});

globalThis.parserWorker.onmessage =
  ("message",
  (event) => {
    const type = event.data?.type;

    if (workerEvents.has(type)) {
      workerEvents.get(type)(event.data.data);
    }
  });

loadJsonButtonElement.addEventListener("click", () => {
  fileInputElement.click();
});
fileInputElement.addEventListener("input", async () => {
  const file = fileInputElement.files?.[0];

  if (!file) {
    return;
  }

  const fileText = await readFile(file);

  globalThis.parserWorker.postMessage({
    type: "parse",
    data: fileText,
  });
});
