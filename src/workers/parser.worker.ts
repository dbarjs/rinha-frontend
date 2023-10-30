import { createWorker } from "../composables/createWorker";
import type { Worker } from "../types/worker";

export type ParserWorker = Worker<
  {
    upload: File;
  },
  {
    result: boolean;
  }
>;

const worker = createWorker<ParserWorker>();

// import { safeParse } from "../utils/safeParse";

// function parse(value: string) {
//   const result = safeParse(value);

//   if (!result.success) {
//     postMessage({
//       type: "parse-result",
//       data: "error",
//     });

//     return;
//   }

//   postMessage({
//     type: "parse-result",
//     data: "success",
//   });
// }

// const windowMap = {
//   parse: (data) => {
//     parse(data);

//     console.log("keys", globalThis.keys.length);

//     const request = indexedDB.open("jsonkeys", 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;

//       const objectStore = db.createObjectStore("keys", {
//         keyPath: "id",
//       });

//       objectStore.transaction.oncomplete = () => {
//         const fileObjectStore = db
//           .transaction("keys", "readwrite")
//           .objectStore("keys");

//         globalThis.keys.forEach((key) => {
//           fileObjectStore.add({
//             id: key,
//           });
//         });
//       };
//     };
//   },
//   created: (data) => {
//     globalThis.isCreated = true;

//     postMessage({
//       type: "keys-count",
//       data: globalThis.keys.length,
//     });
//   },
// };

// self.onmessage = function (event) {
//   console.log("message", event);

//   const type = event.data?.type;

//   if (type in windowMap) {
//     windowMap[type](event.data.data);
//   }
// };

// self.onerror = function (event) {
//   console.log("onerror", event);
// };
