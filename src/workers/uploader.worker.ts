import { createWorker } from "../composables/createWorker";
import { useFile } from "../composables/useFile";
import type { Worker } from "../types/worker";
import { safeParse } from "../utils/safeParse";
import { uuidv4 } from "../utils/crypto";
import { getKeysCount } from "../utils/getKeysCount";
import { FileMetadata } from "../types/file";
import { getIndexedDB } from "../utils/indexed-db";

export type UploaderWorker = Worker<
  {
    upload: File;
  },
  {
    error: {
      message: string;
    };
    progress: "parsing" | "analyzing" | "uploading";
    success: {
      id: string;
      metadata: FileMetadata;
    };
  }
>;

const worker = createWorker<UploaderWorker>();

worker.addAction("upload", async (file) => {
  if (!file) {
    worker.callHook("error", {
      message: "file is not found",
    });

    return;
  }

  const { readText } = useFile(file);

  const fileText = await readText();

  worker.callHook("progress", "parsing");

  const result = safeParse(fileText);

  if (!result.success) {
    worker.callHook("error", {
      message: "failed to parse file",
    });

    return;
  }

  worker.callHook("progress", "analyzing");

  const id = uuidv4();
  const metadata: FileMetadata = {
    fileName: file.name,
    fileSize: file.size,
    keyCount: getKeysCount(result.data),
  };

  worker.callHook("progress", "uploading");

  try {
    console.log("indexedDB");

    const db = await getIndexedDB("jsontreeview");

    console.log("db", db);

    // const objectStore = db.createObjectStore("files", {
    //   keyPath: "id",
    // });
    // objectStore.createIndex("id", "id", { unique: true });

    // objectStore.transaction.oncomplete = () => {
    //   const filesObjectStore = db
    //     .transaction("files", "readwrite")
    //     .objectStore("files");

    //   filesObjectStore.add({
    //     id,
    //     metadata,
    //     data: result.data,
    //   });
    // };

    console.debug("id", id);

    worker.callHook("success", {
      id,
      metadata,
    });
  } catch {
    console.error("deu ruim no db");
  }
});
