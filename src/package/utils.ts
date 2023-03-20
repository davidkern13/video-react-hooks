import { videoPlayer } from './videoPlayer';

export const debounce = (func: any, wait: any) => {
  let timeout: number | null;

  return function (...args: any) {
    const later = () => {
      timeout = null;
      //@ts-ignore
      func.apply(this, args);
    };

    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getVideoStatus = async () => {
  const video: any = await videoPlayer.getVideo();
  return video.readyState >= 4;
};

export const checkVideoStatus = () => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      const status = await getVideoStatus();
      if (status) {
        clearInterval(intervalId);
        resolve(status);
      }
    }, 1);

    // Reject the promise if the checkFn doesn't return a truthy value after 10 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      reject('Timeout exceeded, video is not ready.');
    }, 10000);
  });
};

// export const memoizePreviousValue = () => {
//   let prevValue: any = null;

//   return (currentValue: any) => {
//     const memoizedValue = prevValue;
//     prevValue = currentValue;
//     return memoizedValue;
//   };
// };

// const obj = {
//   value: null as any,
//   get latest() {
//     return this.value;
//   },
//   set current(data: any) {
//     this.value = data;
//   },
// };