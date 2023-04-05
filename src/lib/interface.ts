interface MethodProp<T> {
  (event?: any): T;
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
  event?: any;
}

export interface ICreateEffect {
  (e?: TVolumeEffect | TErrorEffect): any;
}
export interface IDepsEffect {
  deps: Array<any> | void | null;
}

export type TVolumeEffect = {
  volume: number | null;
};

export type TErrorEffect = {
  code: number;
  message: string;
};