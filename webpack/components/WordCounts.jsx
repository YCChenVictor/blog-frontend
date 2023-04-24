import React, { useState, useEffect, useRef, useNavigate } from "react";

const WordCounts = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const element = document.getElementById('article');
    if (!element) {
      return null;
    }
    const text = element.textContent;
    const words = text.trim().split(/\s+/);
    setCount(words.length)
  }, []);

  return(
    <div>
      word count: {count}
    </div>
  )
}

export default WordCounts;
