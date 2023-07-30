import React, { useState, useEffect } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { solarizedLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const RenderCode = (props) => {
  let result
  if (props.inline === true) {
    result = <code className="bg-blue-500 text-white p-4">{props.children[0]}</code>
  } else {
    const language = /language-(\w+)/.exec(props['className'] || '')[1]
    result = 
      <SyntaxHighlighter
        {...props}
        lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
        wrapLines={true}
        language={language}
        PreTag="div"
      />
  }

  return(
    result
  )
}

export default RenderCode
