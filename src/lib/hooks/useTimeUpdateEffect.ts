import React, { useCallback } from "react";
import { dispatcher } from "../dispatcher";
import { videoPlayer } from "../videoPlayer";
import { ICreateEffect, IDepsEffect, Nullable } from "../interface";

export function useTimeUpdateEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  let requestAnimationId: Nullable<number> = null;
  let prevTime: Nullable<number> = null;

  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerCallback = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = prevTime ? currentTime - prevTime : 0;

    if (prevTime === null || timeDiff >= 1000 / 60) {
      prevTime = currentTime;
      dispatcher.enqueue({ callback, deps });
    }

    requestAnimationId = requestAnimationFrame(registerCallback);
  }, [callback, deps]);

  const registerListener = () => {
    if (videoPlayer.getStatus() === "pause" && requestAnimationId === null) {
      requestAnimationId = requestAnimationFrame(registerCallback);
    }
  };

  const listenerProps = {
    type: "timeupdate",
    listener: registerListener,
  };

  videoPlayer.addEventListener(listenerProps);

  return () => {
    requestAnimationId && window.cancelAnimationFrame(requestAnimationId);
    videoPlayer.removeEventListener(listenerProps);
  };
}
