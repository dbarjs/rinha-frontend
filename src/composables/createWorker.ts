import { Worker } from "../types/worker";

export function createWorker<TWorker extends Worker<any, any>>() {
  const actions = {} as Record<
    keyof TWorker["actions"],
    (payload: any) => Promise<void> | void
  >;

  const addAction = <
    TKey extends keyof TWorker["actions"],
    TPayload extends TWorker["actions"][TKey]
  >(
    eventKey: TKey,
    event: (payload: TPayload) => Promise<void> | void
  ) => {
    actions[eventKey] = event;
  };

  const callHook = <
    TKey extends keyof TWorker["hooks"],
    TPayload extends TWorker["hooks"][TKey]
  >(
    eventKey: TKey,
    payload: TPayload
  ) => {
    self.postMessage({
      key: eventKey,
      payload,
    });
  };

  self.addEventListener("message", (event) => {
    if (event.data.key in actions) {
      (actions[event.data.key] as (payload: any) => Promise<void> | void)(
        event.data.payload
      );
    }
  });

  return {
    addAction,
    callHook,
  };
}
