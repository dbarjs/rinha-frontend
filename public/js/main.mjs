import {
  appElement,
  fileInputElement,
  loadJsonButtonElement,
} from "/js/elements.mjs";
import { JsonView } from "/js/JsonView.mjs";
import { useFile } from "./composables/useFile.mjs";

function getParserWorker() {
  if (!window.Worker) {
    console.error("Your browser doesn't support web workers.");
    return;
  }

  const worker = new Worker("/js/workers/parser.mjs", {
    name: "parser",
    type: "module",
  });

  console.log("worker", worker);

  return worker;
}

function getFlatterWorker() {
  if (!window.Worker) {
    console.error("Your browser doesn't support web workers.");
    return;
  }

  const worker = new Worker("/js/workers/flatter.mjs", {
    name: "flatter",
    type: "module",
  });

  return worker;
}

const parser = getParserWorker();
const flatter = getFlatterWorker();

export const workerEvents = new Map();

workerEvents.set("parse-result", (data) => {
  if (data === "success") {
    appElement.classList.remove("hasError");
    globalThis.jsonTree = new JsonView();

    parser.postMessage({
      type: "created",
    });
  } else {
    appElement.classList.add("hasError");
  }
});
workerEvents.set("keys-count", (data) => {
  console.info("keys-count", data);

  globalThis.jsonTree.setHeightByKeysCount(data);
});
workerEvents.set("flat-result", (payload) => {
  console.log("flat", payload[0], payload[1].length);
});
workerEvents.set("parsed-data", (data) => {
  // flatter.postMessage({
  //   type: "flat",
  //   data: ["", data],
  // });
});

parser.onmessage =
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

  const { readText } = useFile(file);

  const fileText = await readText();

  console.log("fileText", fileText.length);

  parser.postMessage({
    type: "parse",
    data: fileText,
  });
});

document.addEventListener("scroll", (event) => {
  console.log("scroll", event);
});
