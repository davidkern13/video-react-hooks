"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = require("./dispatcher");
var videoPlayer_1 = require("./videoPlayer");
var utils_js_1 = require("./utils.js");
var useReadyEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        (0, utils_js_1.checkVideoStatus)()
            .then(function () {
            dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    var listenerProps = {
        type: 'loadedmetadata',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var usePlayingEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'playing',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var usePauseEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        var currentTime = videoPlayer_1.videoPlayer.getCurrentTime();
        var duration = videoPlayer_1.videoPlayer.getDuration();
        if (currentTime === duration) {
            dispatcher_1.dispatcher.dequeue({ callback: callback, deps: deps });
            return;
        }
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'pause',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useSeekingEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'seeking',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useSeekedEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'seeked',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useTimeUpdateEffect = function (create, deps) {
    var requestAnimationId = null;
    var prevTime = null;
    var callback = function () { return create(); };
    var registerCallback = function () {
        var currentTime = Date.now();
        var timeDiff = prevTime ? currentTime - prevTime : 0;
        if (prevTime === null || timeDiff >= 1000) {
            prevTime = currentTime;
            dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
        }
        requestAnimationId = requestAnimationFrame(registerCallback);
    };
    var registerListener = function () {
        if (videoPlayer_1.videoPlayer.getStatus() === 'pause' && requestAnimationId === null) {
            requestAnimationId = requestAnimationFrame(registerCallback);
        }
    };
    var listenerProps = {
        type: 'timeupdate',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        requestAnimationId && window.cancelAnimationFrame(requestAnimationId);
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useEndEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'ended',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useWaitingEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'waiting',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useErrorEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'error',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
var useVolumeChangeEffect = function (create, deps) {
    var callback = function () { return create(); };
    var registerListener = function () {
        dispatcher_1.dispatcher.enqueue({ callback: callback, deps: deps });
    };
    var listenerProps = {
        type: 'volumechange',
        listener: registerListener,
    };
    videoPlayer_1.videoPlayer.addEventListener(listenerProps);
    return function () {
        videoPlayer_1.videoPlayer.removeEventListener(listenerProps);
    };
};
module.exports = {
    useReadyEffect: useReadyEffect,
    usePlayingEffect: usePlayingEffect,
    usePauseEffect: usePauseEffect,
    useSeekingEffect: useSeekingEffect,
    useSeekedEffect: useSeekedEffect,
    useTimeUpdateEffect: useTimeUpdateEffect,
    useEndEffect: useEndEffect,
    useWaitingEffect: useWaitingEffect,
    useErrorEffect: useErrorEffect,
    useVolumeChangeEffect: useVolumeChangeEffect,
};
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
