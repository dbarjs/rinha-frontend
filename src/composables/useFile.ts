export function useFile(file: File): { readText: () => Promise<string> } {
  const readText = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const jsonText = event.target?.result;

        if (typeof jsonText !== "string") {
          return reject("Invalid json text");
        }

        resolve(jsonText);
      });

      reader.addEventListener("error", () => {
        reject("Failed to read file");
      });

      reader.readAsText(file);
    });

  return { readText };
}
