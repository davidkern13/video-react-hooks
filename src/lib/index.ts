import { useEffect, useCallback } from "react";
import { dispatcher } from "./dispatcher";
import { videoPlayer } from "./videoPlayer";
import { ICreateEffect, IDepsEffect, Nullable } from "./interface";
import { checkVideoStatus } from "./utils";

export const useReadyEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const usePlayingEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerListener = useCallback(() => {
    checkVideoStatus()
      .then(() => {
        dispatcher.enqueue({ callback, deps });
      })
      .catch((error) => {
        console.log(error);
      });
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
};

export const usePauseEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useSeekingEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useSeekedEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useTimeUpdateEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
  let requestAnimationId: Nullable<number> = null;
  let prevTime: Nullable<number> = null;

  const callback = useCallback(() => {
    return create();
  }, [create]);

  const registerCallback = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = prevTime ? currentTime - prevTime : 0;

    if (prevTime === null || timeDiff >= 1000 / 60) { // run once per frame
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
};

export const useEndEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useWaitingEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useErrorEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};

export const useVolumeChangeEffect = (
  create: ICreateEffect | any,
  deps: IDepsEffect | never[]
) => {
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
};
