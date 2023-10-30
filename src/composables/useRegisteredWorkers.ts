import type { UploaderWorker } from "../workers/uploader.worker";
import { useWorker } from "./useWorker";

export function useRegisteredWorkers() {
  return {
    getUploaderWorker: () =>
      useWorker<UploaderWorker>("../workers/uploader.worker.ts"),
    getParserWorker: () => useWorker("../workers/parser.worker.ts"),
  };
}
