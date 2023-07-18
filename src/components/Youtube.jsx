import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer.jsx"

function Youtube() {
  const [categories, setCategories] = useState({
    'music': ['TNHDNHtghK4']
  })

  // useEffect(() => {
  //   fetch('http://localhost:3000/youtube_v3/') // do not know the best way to get it
  //     .then(response => response.json())
  //     .then(data => {
  //       // setCategories(data)
  //       setCategories({
  //         'music': 'TNHDNHtghK4'
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);    
  //     });
  // }, [])

  return (
    // the following approach is wrong because youtube requires API KEY also on the frontend...
    <ul>
      {Object.entries(categories).map(([category, videos]) => (
        <li key={category}>
          <h2>{category}</h2>
          <ul>
            {videos.map(videoId => (
              <li key={videoId}>
                <VideoPlayer videoUrl={`https://www.youtube.com/watch?v=${videoId}`} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Youtube;
