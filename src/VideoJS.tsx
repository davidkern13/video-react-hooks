import React, {useEffect, useRef} from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: any;
  onReady: any;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<any>();
  const playerRef = useRef<any>();

  useEffect(() => {
    //player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      });

    } else {
      // you can update player here
    }
  }, [options, onReady]);


  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <video ref={videoRef} className="video-js" />;
};

export default VideoPlayer;
