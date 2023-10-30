export function getIndexedDB(name: string): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const handleSuccessEvent = (event: Event | IDBVersionChangeEvent) => {
      if (!event.target) {
        return reject(new Error("event.target is not found"));
      }

      if ("result" in event.target) {
        const db = event.target.result as IDBDatabase;

        return resolve(db);
      }
    };

    const request = indexedDB.open(name);

    request.onerror = (event) => {
      reject(event);
    };

    request.onupgradeneeded = handleSuccessEvent;
    request.onsuccess = handleSuccessEvent;
  });
}
