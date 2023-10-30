import type { Worker } from "../types/worker";

export function useWorker<TWorker extends Worker>(path: string) {
  if (!window.Worker) {
    throw new Error("Your browser doesn't support web workers.");
  }

  const worker = new Worker(new URL(path, import.meta.url), {
    name: "parser",
    type: "module",
  });

  console.debug("worker loaded", path);

  const subscriptions = {} as Record<
    string,
    ((payload: any) => void | Promise<void>)[]
  >;

  const hook: <
    TKey extends keyof TWorker["hooks"],
    TPayload extends TWorker["hooks"][TKey]
  >(
    key: TKey,
    hookEvent: (payload: TPayload) => void | Promise<void>
  ) => void = (key, hookEvent) => {
    if (!Array.isArray(subscriptions[key as string])) {
      subscriptions[key as string] = [];
    }

    subscriptions[key as string].push(hookEvent);
  };

  const dispatch: <
    TKey extends keyof TWorker["actions"],
    TPayload extends TWorker["actions"][TKey]
  >(
    key: TKey,
    payload: TPayload
  ) => void = (key, payload) => {
    worker.postMessage({
      key,
      payload,
    });
  };

  const destroy = () => {
    worker.terminate();

    Object.keys(subscriptions).forEach((key) => {
      subscriptions[key] = [];
    });
  };

  worker.addEventListener("message", (event) => {
    if (Array.isArray(subscriptions[event.data.key])) {
      subscriptions[event.data.key].forEach((hook) => {
        hook(event.data.payload);
      });
    }
  });

  return {
    worker,
    hook,
    dispatch,
    destroy,
  };
}
