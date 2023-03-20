import { IQueQue } from './interface';

class DispatcherHooks {
  private queue: IQueQue[] = [];
  private isDispatching: boolean = false;
  private previousDeps: any = [];

  enqueue = ({ callback, deps }: IQueQue) => {
    const isMount = this.previousDeps.length === 0;
    const hasChangedDeps = !isMount && !this.compareDeps(this.previousDeps, deps);

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
      if (queuedCallback.callback === callback && this.compareDeps(queuedCallback.deps, deps)) {
        queuedCallback.callback = () => {}; // Set callback to empty function
        return false; // Remove from queue
      }
      return true; // Keep in queue
    });
  };

  compareDeps = (prevDeps: any, nextDeps: any) => {
    if (prevDeps.length !== nextDeps.length) {
      return false;
    }

    return prevDeps.every((dep: any, index: any) => dep === nextDeps[index]);
  };

  dispatch = () => {
    if (this.queue.length === 0) {
      this.isDispatching = false;
      return;
    }

    const queuedCallback = this.queue[0];

    const callback = queuedCallback.callback;

    const deps = queuedCallback.deps;

    if (callback.toString() === '() => {}') {
      this.queue.shift();
      this.dispatch();
      return;
    }

    callback();

    if (this.compareDeps(this.previousDeps, deps)) {
      this.queue.shift();
    } else {
      this.previousDeps = deps;
    }

    Promise.resolve().then(() => this.dispatch());
  };
}

export const dispatcher = new DispatcherHooks();
