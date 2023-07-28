import React, { useState, useEffect } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { solarizedLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const RenderCode = (props) => {
  console.log(props)
  const language = /language-(\w+)/.exec(props['className'] || '')[1]
  return (
    <SyntaxHighlighter
      {...props}
      lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
      wrapLines={true}
      language={language}
      PreTag="div"
    />
  )
}

export default RenderCode
