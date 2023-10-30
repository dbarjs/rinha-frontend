export class JsonView {
  root: HTMLElement;
  inner: HTMLElement;

  constructor(appElement: HTMLElement) {
    this.root = appElement;
    this.inner = document.createElement("div");

    // this.build();
  }

  build() {
    this.root.innerHTML = "";
    this.root.classList.add("JsonView");

    this.inner = document.createElement("div");
    this.inner.classList.add("JsonView__inner");
    this.root.appendChild(this.inner);
  }

  setHeightByKeysCount(keysCount: number) {
    const height = keysCount * 16 * 1.76;
    this.root.style.minHeight = `${height}px`;
  }
}
