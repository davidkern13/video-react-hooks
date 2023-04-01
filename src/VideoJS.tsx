import React, {useEffect, useRef} from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: any;
  onReady: any;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<any>();
  const playerRef = useRef<any>();

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      });

    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
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
