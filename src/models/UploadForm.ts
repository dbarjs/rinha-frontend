export class UploadForm {
  root: HTMLElement;
  statusElement: HTMLElement | null;

  constructor(appElement: HTMLElement) {
    this.root = appElement;
    this.statusElement = document.getElementById("status");
  }

  setState(state: "error" | "success" | string) {
    if (!this.statusElement) {
      return;
    }

    this.statusElement.classList.value = "isVisible";

    if (state === "error") {
      this.statusElement.classList.add("hasError");
      this.statusElement.innerHTML =
        "Invalid file. Please load a valid JSON file.";

      return;
    }

    if (state === "success") {
      this.statusElement.innerHTML = "File loaded successfully.";
    } else {
      this.statusElement.innerHTML = `Loading file... ${state}`;
    }
  }
}
