import React, {useState, useRef, useEffect} from "react";
import { useReadyEffect,usePlayingEffect, useSeekingEffect, useTimeUpdateEffect, useSeekedEffect, usePauseEffect, useWaitingEffect, useErrorEffect, useEndEffect } from './lib';
import VideoJS from './VideoJS';

const App = () => {
  const [stateEvent, setStateEvent] = useState<string>();

  const playerRef = useRef<any>();

  useReadyEffect(() => {
    console.log('useReadyEffect');
  }, []);

  useWaitingEffect(() => {
    console.log('useWaitingEffect');
  }, []);

  usePlayingEffect(() => {
    console.log('usePlayingEffect');
    setStateEvent('usePlayingEffect');
  }, []);

  usePauseEffect(() => {
    console.log('usePauseEffect');
    setStateEvent('usePauseEffect');
  }, []);

  useSeekingEffect(() => {
    console.log('useSeekingEffect');
  }, []);

  useSeekedEffect(() => {
    console.log('useSeekedEffect');
  }, []);

  useTimeUpdateEffect(() => {
    console.log('useTimeUpdateEffect');
  }, []);

  useErrorEffect(() => {
    console.log('useErrorEffect');
  }, []);

  useEndEffect(() => {
    console.log('useEndEffect');
  }, []);

  useEffect(() => {
    console.log('stateEvent', stateEvent);
  }, [stateEvent]);


  const videoJsOptions = {
    liveui:true,
    controls: true,
    fluid: true,
    sources: [
      {
        src: 'http://localhost:8000/live/output.m3u8',
        type: 'application/x-mpegURL'
      }
    ]
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    console.log('playerRef.current', playerRef.current);

    player.on('waiting', () => {
      console.log('player is waiting');
    });
    player.on('play', () => {
      console.log('player is play');
    });
    player.on('pause', () => {
      console.log('player is pause');
    });
    player.on('seeking', () => {
      console.log('player is seeking');
    });
    player.on('seeked', () => {
      console.log('player is seeked');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <>
      Live
      <div className="live" style={{width:"100%", height:"1200px"}}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
}

export default App;
