import React, {useState, useEffect} from "react";
import { useReadyEffect,usePlayingEffect, useSeekingEffect, useTimeUpdateEffect, useSeekedEffect, usePauseEffect, useWaitingEffect, useEndEffect } from '../lib';

function App() {
  const [test, setTest] = useState<any>();


  useReadyEffect(() => {
    console.log('useReadyEffect');
  }, []);

  useWaitingEffect(() => {
    console.log('useWaitingEffect');
  }, []);

  usePlayingEffect(() => {
    console.log('usePlayingEffect');
    setTest('usePlayingEffect');
  }, []);

  usePauseEffect(() => {
    console.log('usePauseEffect');
    setTest('usePauseEffect');
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

  useEndEffect(() => {
    console.log('useEndEffect');
  }, []);

  useEffect(() => {
    console.log('test', test);
  }, [test]);


  return (
    <div className="App">
       <video controls>
        <source
          src="https://www.w3schools.com/tags/movie.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
