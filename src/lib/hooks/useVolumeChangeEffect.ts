import React, { useEffect, useCallback } from "react";
import { dispatcher } from "../dispatcher";
import { videoPlayer } from "../videoPlayer";
import {
  ICreateEffect,
  IDepsEffect,
  TVolumeEffect,
  Nullable,
} from "../interface";

export function useVolumeChangeEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback: any = useCallback(
    (e?: TVolumeEffect) => {
      return create(e);
    },
    [create]
  );

  const registerListener = useCallback(() => {
    const getVolume: Nullable<number> = videoPlayer.getVolume()

    dispatcher.enqueue({ callback, deps, event: { volume: getVolume } })
  }, [callback, deps]);

  const listenerProps = {
    type: "volumechange",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}
