import { IListener, Nullable } from './interface';
class VideoPlayer {
  video: Nullable<HTMLVideoElement> = null;
  status: Nullable<string> = null;

  constructor() {
    this.getMountedVideo();
  }

  async getMountedVideo(): Promise<HTMLVideoElement> {
    if (this.video) {
      return this.video;
    }

    const maxAttempts: number = 10;
    let attempts: number = 0;

    return new Promise<HTMLVideoElement>((resolve, reject) => {
      let videoTimeoutId: NodeJS.Timeout;

      const checkForVideo = () => {
        this.video = document.querySelector("video");
        if (this.video) {
          clearTimeout(videoTimeoutId);
          resolve(this.video);
        } else if (++attempts >= maxAttempts) {
          clearTimeout(videoTimeoutId);
          reject(new Error("Video element not found"));
        } else {
          videoTimeoutId = setTimeout(checkForVideo, 10);
        }
      };

      videoTimeoutId = setTimeout(checkForVideo, 10);

      const cleanup = () => {
        clearTimeout(videoTimeoutId);
      };
      Promise.resolve().then(() => {
        this.video?.removeEventListener("loadeddata", cleanup);
      });
      this.video?.addEventListener("loadeddata", cleanup);
    });
  }

  async addEventListener({
    type,
    listener,
    options,
  }: IListener): Promise<void> {
    if (!type || !listener) {
      console.log("Missing type or listener!");
      return;
    }
    const video = this.video;
    if (!video) return;

    video.addEventListener(
      type,
      (event: Event) => {
        this.status = event.type;
        typeof listener === "function" && listener(event);
      },
      options
    );
  }

  async removeEventListener({
    type,
    listener,
    options,
  }: IListener): Promise<void> {
    if (!type || !listener) {
      console.log("Missing type or listener!");
      return;
    }
    const video = this.video;
    if (!video) return;

    video.removeEventListener(type, listener, options);
  }

  getReadyPlayer(): void {
    const readyEvent = new Event("playerready");
    videoPlayer?.dispatchEvent(readyEvent);
  }
  dispatchEvent(event: Event): void {
    this.video?.dispatchEvent(event);
  }

  getStatus(): Nullable<string> {
    return this.status;
  }
  getReadyState(): Nullable<number> {
    return this.video && this.video.readyState;
  }
  getCurrentTime(): Nullable<number> {
    return this.video && this.video.currentTime;
  }
  getDuration(): Nullable<number> {
    return this.video && this.video.duration;
  }
  getVolume(): Nullable<number> {
    return this.video && this.video.volume;
  }
}

export const videoPlayer = new VideoPlayer();
