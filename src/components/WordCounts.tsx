import React from 'react';

const WordCounts = ({ articleContent }) => {
  const words = articleContent.split(' ');

  return (
    <div className="px-4" style={{ color: 'black' }}>
      words: {words.length}
    </div>
  );
};

export default WordCounts;
