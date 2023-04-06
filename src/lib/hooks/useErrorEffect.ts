import React, { useEffect, useCallback } from "react";
import { dispatcher } from "../dispatcher";
import { videoPlayer } from "../videoPlayer";
import {
  ICreateEffect,
  TErrorEffect,
  IDepsEffect,
  Nullable,
} from "../interface";

export function useErrorEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(
    (e?: TErrorEffect) => {
      return create(e);
    },
    [create]
  );

  const registerListener = useCallback(() => {
    const error: Nullable<TErrorEffect> = videoPlayer.getError();

    dispatcher.enqueue({ callback, deps, event: error });
  }, [callback, deps]);

  const listenerProps = {
    type: "error",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}