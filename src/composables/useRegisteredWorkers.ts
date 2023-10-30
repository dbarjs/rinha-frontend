import type { UploaderWorker } from "../workers/uploader.worker";
import { useWorker } from "./useWorker";

export function useRegisteredWorkers() {
  return {
    getUploaderWorker: () =>
      useWorker<UploaderWorker>("../workers/uploader.ts"),
    getParserWorker: () => useWorker("../workers/parser.ts"),
  };
}
