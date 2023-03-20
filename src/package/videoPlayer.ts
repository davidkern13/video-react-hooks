import { IListener, Nullable } from './interface';
class VideoPlayer {
  video: Nullable<HTMLVideoElement> = null;
  status: Nullable<string> = null;

  async getVideo(): Promise<HTMLVideoElement> {
    if (this.video) {
      return this.video;
    }

    const maxAttempts: number = 10;
    let attempts: number = 0;

    return new Promise<HTMLVideoElement>((resolve, reject) => {
      let videoTimeoutId: NodeJS.Timeout;

      const checkForVideo = () => {
        this.video = document.querySelector('video');
        if (this.video) {
          clearTimeout(videoTimeoutId);
          resolve(this.video);
        } else if (++attempts >= maxAttempts) {
          clearTimeout(videoTimeoutId);
          reject(new Error('Video element not found'));
        } else {
          videoTimeoutId = setTimeout(checkForVideo, 100);
        }
      };

      videoTimeoutId = setTimeout(checkForVideo, 100);

      const cleanup = () => {
        clearTimeout(videoTimeoutId);
      };
      Promise.resolve().then(() => {
        this.video?.removeEventListener('loadedmetadata', cleanup);
      });
      this.video?.addEventListener('loadedmetadata', cleanup);
    });
  }

  async addEventListener({ type, listener, options }: IListener): Promise<void> {
    if (!type || !listener) {
      console.log('Missing type or listener!');
      return;
    }
    const video = await this.getVideo();
    video.addEventListener(
      type,
      (event: Event) => {
        this.status = event.type;
        typeof listener === 'function' && listener(event);
      },
      options
    );
  }

  async removeEventListener({ type, listener, options }: IListener): Promise<void> {
    if (!type || !listener) {
      console.log('Missing type or listener!');
      return;
    }
    const video = await this.getVideo();
    video.removeEventListener(type, listener, options);
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
}

export const videoPlayer = new VideoPlayer();
