import React from 'react';

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div>
      <iframe
        src={videoUrl}
        width="560"
        height="315"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
