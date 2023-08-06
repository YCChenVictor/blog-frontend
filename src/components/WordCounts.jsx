import React from "react";

const WordCounts = ({articleContent}) => {
  const words = articleContent.split(' ')

  return(
    <div style={{color: 'black'}}>
      words: {words.length}
    </div>
  )
}

export default WordCounts;
