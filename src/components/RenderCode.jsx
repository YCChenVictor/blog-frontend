import React, { useState, useEffect } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const RenderCode = (props) => {
  const language = /language-(\w+)/.exec(props['className'] || '')[1]
  return (
    <SyntaxHighlighter
      {...props}
      language={language}
      PreTag="div"
    />
  )
}

export default RenderCode
