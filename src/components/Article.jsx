import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import SidebarLayout from './SidebarLayout.jsx'
import { marked } from "marked"
import RenderImage from "./RenderImage.jsx"
import RenderCode from "./RenderCode.jsx"

const Article = ({filePath}) => {
  const [markdownContent, setMarkdownContent] = useState('')
  const [rawTitles, setRawTitles] = useState([])
  const length = filePath.split("/").length
  const category = filePath.split("/")[length - 2]
  let articleName = filePath.split("/")[length - 1].split('.')[0]
  articleName = articleName.charAt(0).toUpperCase() + articleName.slice(1)

  useEffect(() => { // try to dynamic import from filePath
    const importFileAndFetchContent = async () => {
      const fileModule = await import(`../${filePath}`)
      const response = await fetch(fileModule.default)
      const text = await response.text()

      const parsedHTML = marked.parse(text)
      const container = document.createElement('div')
      container.innerHTML = parsedHTML

      const tags = Array.from(container.querySelectorAll('h2, h3, h4, h5, h6')).map((tag) => ({
        content: tag.textContent,
        tagName: tag.tagName,
      }));

      setRawTitles(tags);
      setMarkdownContent(text);
    }
    importFileAndFetchContent()
  }, []);

  const generateSlug = (string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
    return str;
  };

  return (
    <div className='bg-gray-400 flex'>
      {rawTitles.length > 0 ? (
        <div className='py-8 fixed'>
          <SidebarLayout
            rawTitles={rawTitles}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className='bg-gray-400 pr-8 pl-24 sm:pr-8 sm:pl-24 md:pr-8 md:pl-24 lg:pr-8 lg:pl-36 xl:pr-8 xl:pl-72 2xl:pr-8 2xl:pl-72'>
        <ReactMarkdown
          children={`${process.env.NODE_ENV}`}
          components={{
            h1: () => (
              <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
            ),
            h2: ({ node, ...props }) => (
              <h2 id={generateSlug(props.children[0])} {...props}></h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 id={generateSlug(props.children[0])} {...props}></h3>
            ),
            h4: ({ node, ...props }) => (
              <h4 id={generateSlug(props.children[0])} {...props}></h4>
            ),
            img: ({ node, ...props }) => (
              RenderImage(props)
            ),
            code: ({ node, ...props }) => (
              RenderCode(props)

            )
          }}
          remarkPlugins={[remarkGfm]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Article
