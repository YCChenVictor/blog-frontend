import React from 'react';
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

const RenderCodeBlock = (props: {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  let language;
  let result;
  if (props.inline === true || !props.className) {
    language = 'inline';
  } else {
    const match = /language-(\w+)/.exec(props['className'] || '');
    language = match ? match[1] : 'inline';
  }

  if (language === 'inline') {
    result = (
      <code className="bg-gray-500 text-white p-0.5">{props.children}</code>
    );
  } else {
    // result =
    // <SyntaxHighlighter
    //   {...props}
    //   lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
    //   wrapLines={true}
    //   language={language}
    //   PreTag="div"
    // >
    //   {React.Children.toArray([props.children])}
    // </SyntaxHighlighter>
  }

  return result;
};

export default RenderCodeBlock;
