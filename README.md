<img src="https://i.ibb.co/CzzMNM7/video-react-1.jpg" style="max-width: 100%;">

<p align="middle" dir="auto">This package suitable for video javascript element. The source written in javascript/typescript/react.</p>

<p align="middle" dir="auto">
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/npm/dt/video-react-hooks?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/github/languages/code-size/davidkern13/video-react-hooks?color=green&style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/-javascript-yellow?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/react-blue?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
<a href="https://www.npmjs.com/package/video-react-hooks" rel="nofollow"><img src="https://img.shields.io/badge/react-91DAFB?style=flat-square" alt="npm version" data-canonical-src="" style="max-width: 100%;"></a>
</p>

# Purpose

Certain situations can make our development as difficult like updates events of video from different parts of the code without consistency.
This makes makes not readable code and difficult to maintain. ```video-react-hooks``` represent a ```video``` events in ```hooks``` shape, possible to use across the application in components of video that need to be affected by the ```video``` events.

# Instalation

```
npm install --save video-react-hooks
```

# Usage Example

Each hook based on ```video``` event and executed when suitable event will fire, the hooks will executed after video will initialized instead of execute hook after render like react do, but under the hood ```video-react-hooks``` also used the ```react hooks```.

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

**usePauseEffect** - executed when video is waiting

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

### Types.

| Event | Type | Hook | Description |
| ------------- | ------------- | ------------- | ------------- |
| e | TErrorEffect | useErrorEffect | value of error |
| e | TVolumeEffect | useVolumeChangeEffect | value of volume change |


### Testing hooks with video type.

| HLS(LIVE) | HLS(VOD) | MP4 |
| ------------- | ------------- | ------------- |
| :white_check_mark: | :white_check_mark: | :white_check_mark: |
