export function useFile(file) {
  /**
   * @returns {Promise<string>}
   */
  const readText = () =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const jsonText = event.target.result;

        resolve(jsonText);
      });

      reader.readAsText(file);
    });

  return { readText };
}
