import React, { useEffect, useCallback } from "react";
import { dispatcher } from "./dispatcher";
import { videoPlayer } from "./videoPlayer";
import { ICreateEffect, IDepsEffect, Nullable } from "./interface";

export function useReadyEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, [callback, deps]);

  const listenerProps = {
    type: "playerready",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    videoPlayer.getReadyPlayer();
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function usePlayingEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, [callback, deps]);

  const listenerProps = {
    type: "playing",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function usePauseEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    const currentTime = videoPlayer.getCurrentTime();
    const duration = videoPlayer.getDuration();
    if (currentTime === duration) {
      dispatcher.dequeue({ callback, deps });
      return;
    }
    dispatcher.enqueue({ callback, deps });
  }, []);

  const listenerProps = {
    type: "pause",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function useSeekingEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

  const listenerProps = {
    type: "seeking",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function useSeekedEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

  const listenerProps = {
    type: "seeked",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

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
  }, []);

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

export function useEndEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

  const listenerProps = {
    type: "ended",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function useWaitingEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

  const listenerProps = {
    type: "waiting",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
    return () => {
      videoPlayer.removeEventListener(listenerProps);
    };
  }, []);
}

export function useErrorEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

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

export function useVolumeChangeEffect(
  create: ICreateEffect,
  deps: IDepsEffect | never[]
) {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    dispatcher.enqueue({ callback, deps });
  }, []);

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
