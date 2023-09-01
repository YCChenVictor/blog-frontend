import React from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const RenderCode = (props) => {
  props.children[0] = props.children[0].replace(/\n$/, '')

  let language
  let result
  if (props.inline === true) {
    language = 'inline'
  } else {
    language = /language-(\w+)/.exec(props['className'] || '')[1]
  }

  if (language === 'inline') {
    result = <code className="bg-gray-500 text-white p-0.5">{props.children[0]}</code>
  } else {
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
