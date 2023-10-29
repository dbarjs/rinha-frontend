import { isObject } from "../utils/isObject.mjs";

globalThis.parsedData = null;
globalThis.isCreated = false;
globalThis.keys = [];

function parse(data) {
  try {
    globalThis.parsedData = JSON.parse(data);
    globalThis.keys = [];

    postMessage({
      type: "parse-result",
      data: "success",
    });

    const request = indexedDB.open("jsontreeview", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      const objectStore = db.createObjectStore("parsedData", {
        keyPath: "filename",
      });

      objectStore.transaction.oncomplete = (event) => {
        console.log("transaction complete", globalThis.parsedData);

        const fileObjectStore = db
          .transaction("parsedData", "readwrite")
          .objectStore("parsedData");

        fileObjectStore.add({
          filename: "giant.json",
          data: globalThis.parsedData,
        });
      };
    };
    request.onsuccess = function (e) {
      console.log("successfully opened db");
    };
    request.onerror = function (e) {
      console.log("error");
    };
  } catch {
    postMessage({
      type: "parse-result",
      data: "error",
    });
  }
}

function getKeys(obj, parentId, key = 0) {
  if (!isObject(obj)) {
    return;
  }

  if (parentId) {
    globalThis.keys.push(`${parentId}.${key}`);
  } else {
    globalThis.keys.push(`${key}`);
  }

  return Object.values(obj).forEach((value, index) => {
    getKeys(value, parentId || "0", index);
  });
}

const windowMap = {
  parse: (data) => {
    parse(data);
    getKeys(globalThis.parsedData);

    console.log("keys", globalThis.keys.length);

    const request = indexedDB.open("jsonkeys", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      const objectStore = db.createObjectStore("keys", {
        keyPath: "id",
      });

      objectStore.transaction.oncomplete = () => {
        const fileObjectStore = db
          .transaction("keys", "readwrite")
          .objectStore("keys");

        globalThis.keys.forEach((key) => {
          fileObjectStore.add({
            id: key,
          });
        });
      };
    };
  },
  created: (data) => {
    globalThis.isCreated = true;

    postMessage({
      type: "keys-count",
      data: globalThis.keys.length,
    });
  },
};

self.onmessage = function (event) {
  console.log("message", event);

  const type = event.data?.type;

  if (type in windowMap) {
    windowMap[type](event.data.data);
  }
};

self.onerror = function (event) {
  console.log("onerror", event);
};
