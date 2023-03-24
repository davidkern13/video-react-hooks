import { IQueQue } from "./interface";
class DispatcherHooks {
  private queue: IQueQue[] = [];
  private isDispatching: boolean = false;
  private previousDeps: any = [];

  enqueue = ({ callback, deps }: IQueQue) => {
    const isMount = this.previousDeps.length === 0;
    const hasChangedDeps =
      !isMount && !this.compareDeps(this.previousDeps, deps);

    if (isMount || hasChangedDeps) {
      const task = { callback, deps };
      this.queue.push(task);

      this.previousDeps = deps;
    }

    if (!this.isDispatching) {
      this.isDispatching = true;
      Promise.resolve().then(() => this.dispatch());
    }
  };

  dequeue = ({ callback, deps }: IQueQue) => {
    this.queue = this.queue.filter((queuedCallback: any) => {
      if (
        queuedCallback.callback === callback &&
        this.compareDeps(queuedCallback.deps, deps)
      ) {
        queuedCallback.callback = () => {};
        return false;
      }
      return true;
    });
  };

  compareDeps = (prevDeps: any, nextDeps: any) => {
    if (prevDeps.length !== nextDeps.length) {
      return false;
    }

    return prevDeps.every((dep: any, index: any) => dep === nextDeps[index]);
  };

  dispatch = () => {
    while (this.queue.length > 0) {
      const queuedCallback = this.queue[0];
      const callback = queuedCallback.callback;
      const deps = queuedCallback.deps;

      if (callback.toString() === "() => {}") {
        this.queue.shift();
        continue;
      }

      try {
        callback();
      } catch (error) {
        console.error("Error occurred while executing task:", error);
      }

      if (this.compareDeps(this.previousDeps, deps)) {
        this.queue.shift();
      } else {
        this.previousDeps = deps;
      }
    }

    this.isDispatching = false;
  };
}

export const dispatcher = new DispatcherHooks();
