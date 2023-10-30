export function useFile(file: File): { readText: () => Promise<string> } {
  const readText = (): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const jsonText = event.target?.result;

        if (typeof jsonText !== "string") {
          throw new Error("jsonText is not string");
        }

        resolve(jsonText);
      });

      reader.readAsText(file);
    });

  return { readText };
}
