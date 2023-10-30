export class UploadForm {
  root: HTMLElement;

  constructor(appElement: HTMLElement) {
    this.root = appElement;
  }

  setState(state: "error" | "success") {
    if (state === "error") {
      this.root.classList.add("hasError");
    } else {
      this.root.classList.remove("hasError");
    }
  }
}
