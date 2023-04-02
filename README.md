![video-react-hooks](https://i.ibb.co/CzzMNM7/video-react-1.jpg)

<p align="center">This package suitable for video javascript element. The source written in javascript/typescript/react.</p>

# in maintenance!!!

# Why

Certain situations can make our development as difficult like updates events of video from different parts of the code without consistency.
This makes makes not readable code and difficult to maintain. video-react-hooks represent video events in hooks shape, possible to use across the application in component of video or other components that need to be affected by the video events.

# Instalation

```
npm install --save video-react-hooks
```

# Usage Example

Each hook based on video event and executed when suitable event will fire, the hooks will executed after video will initialized instead of execute hook after render like react do, but under the hood video-react-hooks also used the react hooks.

```JavaScript

import { useReadyEffect, usePlayingEffect, usePauseEffect } from 'video-react-hooks';

export const VideoComponent = () => {

  useReadyEffect(() => {
    //executed when video is ready
  }, []);

  usePlayingEffect(() => {
    //executed when video is playing
  }, []);

  usePauseEffect(() => {
    //executed when video is paused
  }, []);

  return (
    <div className="App">
       <video controls>
        <source
          src="src"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

```

### Hooks.

| Hook | Execution |
| ------------- | ------------- |
| ```useReadyEffect``` |  video is initialize |
| ```usePlayingEffect``` |  video is playing |
| ```usePauseEffect``` |  video is paused |
| ```useWaitingEffect``` | video is waiting |
| ```useSeekingEffect``` |  video is seeking |
| ```useSeekedEffect``` | video is seeked |
| ```useTimeUpdateEffect``` | run once per frame |
| ```useEndEffect``` | video is ended |
| ```useErrorEffect``` | error occur |
| ```useVolumeChangeEffect``` | volume change |


### Testing hooks with video type.

| HLS(LIVE) | HLS(VOD) | MP4 |
| ------------- | ------------- | ------------- |
| :white_check_mark: | :white_check_mark: | :white_check_mark: |
