"use strict";

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const jsonText = event.target.result;

      resolve(jsonText);
    });

    reader.readAsText(file);
  });
}
