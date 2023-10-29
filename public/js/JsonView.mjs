import { appElement } from "/js/elements.mjs";

export class JsonView {
  constructor() {
    this.root = appElement;
    this.formElement = this.root.innerHTML;

    this.build();
  }

  build() {
    this.root.innerHTML = "";
    this.root.classList.add("JsonView");

    this.inner = document.createElement("div");
    this.inner.classList.add("JsonView__inner");
    this.root.appendChild(this.inner);
  }

  setHeightByKeysCount(keysCount) {
    const height = keysCount * 16 * 1.76;
    this.root.style.minHeight = `${height}px`;
  }
}
