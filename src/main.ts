import {
  appElement,
  fileInputElement,
  loadJsonButtonElement,
} from "./elements";
import { useRegisteredWorkers } from "./composables/useRegisteredWorkers";
import { UploadForm } from "./models/UploadForm";

const { getUploaderWorker } = useRegisteredWorkers();

const uploader = getUploaderWorker();

if (!appElement) {
  throw new Error("appElement is not found");
}

const uploadForm = new UploadForm(appElement);
// const jsonTree = new JsonView(appElement);

loadJsonButtonElement?.addEventListener("click", () => {
  fileInputElement?.click();
});
fileInputElement?.addEventListener("input", async () => {
  const file = fileInputElement?.files?.[0];

  if (!file) {
    return;
  }

  uploader.dispatch("upload", file);
});

uploader.hook("error", () => {
  uploadForm.setState("error");
});

uploader.hook("progress", (progress) => {
  uploadForm.setState(progress);
});

uploader.hook("success", async (result) => {
  uploadForm.setState("success");
  console.debug("success", result);

  if (!appElement) {
    throw new Error("appElement is not found");
  }

  const { JsonView } = await import("./models/JsonView");

  const jsonTree = new JsonView(appElement);

  jsonTree.setHeightByKeysCount(result.metadata.keyCount);
});

// document.addEventListener("scroll", (event) => {
//   console.log("scroll", event);
// });
