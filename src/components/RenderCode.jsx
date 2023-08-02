import React from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const RenderCode = (props) => {
  let result
  if (props.inline === true) {
    result = <code className="bg-gray-500 text-white p-0.5">{props.children[0]}</code>
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
