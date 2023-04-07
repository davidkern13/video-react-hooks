<img src="https://i.ibb.co/CzzMNM7/video-react-1.jpg" style="max-width: 100%;">

<p align="middle" dir="auto">video-react-hooks represents video events in the form of React hooks</p>

<p align="middle" dir="auto">
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/npm/dt/video-react-hooks?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/github/languages/code-size/davidkern13/video-react-hooks?color=green&style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/javascript-f9c46b?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/react-077FF7?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/typescript-0474BC?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
</p>

# Purpose

Video-react-hooks represents video events in the form of React hooks. By encapsulating the video event logic in hooks. These hooks can then be easily used across the application in components that are affected by the video events. This approach not only simplifies the code but also makes it more readable and maintainable.

# Instalation

```
npm install --save video-react-hooks
```

# Usage Example

Each hook built on the concept of React hooks, and each hook is based on a specific video event. These hooks are executed when the corresponding event occurs during video playback. Under the hood video-react-hooks also used React hooks.

[Check Live Example](https://codesandbox.io/s/video-react-hooks-n9bu3d)

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

# API Details

**useReadyEffect** - executed when video is ready

```JavaScript
import { useReadyEffect } from 'video-react-hooks';

useReadyEffect(() => {
  //code here
}, []);
```

**usePlayingEffect** - executed when video is playing

```JavaScript
import { usePlayingEffect } from 'video-react-hooks';

usePlayingEffect(() => {
  //code here
}, []);
```

**usePauseEffect** - executed when video is paused

```JavaScript
import { usePauseEffect } from 'video-react-hooks';

usePauseEffect(() => {
  //code here
}, []);
```

**useWaitingEffect** - executed when video is waiting

```JavaScript
import { useWaitingEffect } from 'video-react-hooks';

useWaitingEffect(() => {
  //code here
}, []);
```

**useSeekingEffect** - executed when video is seeking

```JavaScript
import { useSeekingEffect } from 'video-react-hooks';

useSeekingEffect(() => {
  //code here
}, []);
```

**useSeekedEffect** - executed when video is seeked

```JavaScript
import { useSeekedEffect } from 'video-react-hooks';

useSeekedEffect(() => {
  //code here
}, []);
```

**useTimeUpdateEffect** - executed when video is timeupdate event executed
<br>
<sub>this hooks executed once per frame</sub>

```JavaScript
import { useTimeUpdateEffect } from 'video-react-hooks';

useTimeUpdateEffect(() => {
  //code here
}, []);
```

**useEndEffect** - executed when video is ended
<br>
<sub>executed for hls(vod) or mp4 video</sub>

```JavaScript
import { useEndEffect } from 'video-react-hooks';

useEndEffect(() => {
  //code here
}, []);
```

**useErrorEffect** - executed when video error event occur

```JavaScript
import { useErrorEffect } from 'video-react-hooks';

useErrorEffect((e) => {
  //code here
}, []);
```

**useVolumeChangeEffect** - executed when video volume change

```JavaScript
import { useVolumeChangeEffect } from 'video-react-hooks';

useVolumeChangeEffect((e) => {
  //code here
}, []);
```
### Additional Hooks


| useRateChangeEffect |
| useStalledEffect |
| useSuspendEffect |
| useAbortEffect |

### Types


| Event | Type | Hook | Description |
| ------------- | ------------- | ------------- | ------------- |
| e | TErrorEffect | useErrorEffect | value of error |
| e | TVolumeEffect | useVolumeChangeEffect | value of volume change |


### Testing hooks with video type


| HLS(LIVE) | HLS(VOD) | MP4 |
| ------------- | ------------- | ------------- |
| :white_check_mark: | :white_check_mark: | :white_check_mark: |
