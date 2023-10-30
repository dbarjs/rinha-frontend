import {
  appElement,
  fileInputElement,
  loadJsonButtonElement,
} from "./elements";
import { useFile } from "./composables/useFile";
import { useRegisteredWorkers } from "./composables/useRegisteredWorkers";

const { getUploaderWorker } = useRegisteredWorkers();

const uploader = getUploaderWorker();

if (!appElement) {
  throw new Error("appElement is not found");
}

// const uploadForm = new UploadForm(appElement);
// const jsonTree = new JsonView(appElement);

loadJsonButtonElement.addEventListener("click", () => {
  fileInputElement.click();
});
fileInputElement.addEventListener("input", async () => {
  const file = fileInputElement.files?.[0];

  if (!file) {
    return;
  }

  uploader.dispatch("upload", file);

  const { readText } = useFile(file);

  const fileText = await readText();

  console.log("fileText", fileText.length);
});

document.addEventListener("scroll", (event) => {
  console.log("scroll", event);
});
