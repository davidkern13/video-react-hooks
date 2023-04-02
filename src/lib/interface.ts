interface MethodProp<T> {
  (): T;
}

interface DepsProp {
  deps: any;
}

export type Nullable<T> = T | null;

export interface IListener {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

export interface IQueQue extends DepsProp {
  callback: MethodProp<void>;
}

export interface ICreateEffect {
  (): void;
}
export interface IDepsEffect {
  deps: Array<any> | void | null;
}
