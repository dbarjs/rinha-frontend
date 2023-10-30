import { createWorker } from "../composables/createWorker";
import type { Worker } from "../types/worker";

export type UploaderWorker = Worker<
  {
    upload: File;
  },
  {
    result: boolean;
  }
>;

const worker = createWorker<UploaderWorker>();

worker.addAction("upload", (file) => {
  console.log("upload", file);

  worker.callHook("result", true);
});
