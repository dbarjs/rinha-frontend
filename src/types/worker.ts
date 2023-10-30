export type WorkerEventMap = Record<string, unknown>;

export type Worker<
  TActions extends WorkerEventMap = {}, // input
  THooks extends WorkerEventMap = {} // output
> = {
  actions: TActions;
  hooks: THooks;
};
