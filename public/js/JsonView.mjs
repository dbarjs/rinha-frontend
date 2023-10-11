"use strict";

import { appElement } from "/js/elements.mjs";

export class JsonView {
  constructor() {
    this.root = appElement;
    this.formElement = this.root.innerHTML;

    this.root.innerHTML = "";
  }

  setHeightByKeysCount(keysCount) {
    const height = keysCount * 16 * 1.76;

    this.root.style.minHeight = `${height}px`;
  }

  parse() {
    return JSON.parse(this.jsonText);
  }

  getKeys(obj) {
    if (typeof obj !== "object" || obj === null) {
      return;
    }

    this.keys += Object.keys(obj).length;

    return Object.values(obj).forEach((value) => {
      this.getKeys(value);
    });
  }

  getKeysCount() {
    this.keys = 0;

    this.getKeys(this.parse());

    return this.keys;
  }
}
