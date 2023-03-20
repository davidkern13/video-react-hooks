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
    checkVideoStatus()
      .then(() => {
        dispatcher.enqueue({ callback, deps });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [callback, deps]);

  const listenerProps = {
    type: "loadedmetadata",
    listener: registerListener,
  };

  useEffect(() => {
    videoPlayer.addEventListener(listenerProps);
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

    if (prevTime === null || timeDiff >= 1000) {
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

// module.exports = {
//   useReadyEffect,
//   usePlayingEffect,
//   usePauseEffect,
//   useSeekingEffect,
//   useSeekedEffect,
//   useTimeUpdateEffect,
//   useEndEffect,
//   useWaitingEffect,
//   useErrorEffect,
//   useVolumeChangeEffect,
// };

// StalledEffect: (create: any, deps: Array<any> | void | null) => {
//   let errorSequence: any = [];

//   const handleError = (event: any) => {
//     errorSequence = [...errorSequence, event.type];
//   };

//   const resetVideo = () => {
//     videoPlayer?.src(videoPlayer?.currentSrc());
//   };

//   const checkProgress = () => {
//     const currentTime = videoPlayer?.currentTime();
//     const previousTime = videoPlayer?.previousTime || 0;
//     videoPlayer?.previousTime = currentTime;

//     if (previousTime === currentTime && errorSequence.length > 0) {
//       const lastEvent = errorSequence[errorSequence.length - 1];
//       const currentTime = Date.now();

//       if (
//         (lastEvent === 'suspend' || lastEvent === 'stalled') &&
//         currentTime - videoPlayer?.suspendTime >= 5000
//       ) {
//         resetVideo();
//       }
//     } else {
//       errorSequence = [];
//       videoPlayer?.suspendTime = Date.now();
//     }
//   };

//   const intervalId = setInterval(checkProgress, 1000);

//   const cleanup = () => clearInterval(intervalId);

//   videoPlayer.addEventListener('error', handleError);
//   videoPlayer.addEventListener('suspend', handleError);
//   videoPlayer.addEventListener('stalled', handleError);

//   return () => {
//     videoPlayer.removeEventListener('error', handleError);
//     videoPlayer.removeEventListener('suspend', handleError);
//     videoPlayer.removeEventListener('stalled', handleError);
//     cleanup();
//   };
//}
