import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { marked } from 'marked'
import mermaid from 'mermaid'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'

import SidebarLayout from './SidebarLayout.jsx'
import RenderImage from './RenderImage.jsx'
import RenderCodeBlock from './RenderCodeBlock.jsx'
import RenderMermaid from './RenderMermaid.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

interface ArticleComponent {
  setting: Object
}

function Article({setting}: ArticleComponent) {
  const filePath = `posts/${setting['url']}.md`
  const [markdownContent, setMarkdownContent] = useState('')
  const [rawTitles, setRawTitles] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const componentSidebarRef = useRef(null);

  const length = filePath.split("/").length
  const category = filePath.split("/")[length - 2]
  let articleName = filePath.split("/")[length - 1].split('.')[0]
  articleName = articleName.charAt(0).toUpperCase() + articleName.slice(1)

  useEffect(() => { // try to dynamic import from filePath
    const importFileAndFetchContent = async () => {
      const fileModule = await import(`../${filePath}`)
      const response = await fetch(fileModule.default)
      const text = await response.text()
      setMarkdownContent(text);

      const parsedHTML = marked.parse(text)
      const container = document.createElement('div')
      container.innerHTML = parsedHTML
      const tags = Array.from(container.querySelectorAll('h2, h3, h4, h5, h6')).map((tag) => ({
        content: tag.textContent,
        tagName: tag.tagName,
      }));
      setRawTitles(tags);
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
      <div className='' ref={componentSidebarRef}>
        {rawTitles.length > 0 ? (
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="hidden lg:block"> {/* Hide SidebarLayout on screens smaller than "lg" */}
              <div className="p-2"> {/* Add these classes */}
                <button
                  className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsCollapsed(!isCollapsed)
                  }}
                >
                  <MenuOutlinedIcon />
                </button>
                <SidebarLayout
                  isCollapsed={isCollapsed}
                  loggedIn={loggedIn}
                  setting={setting}
                  articleContent={markdownContent}
                  rawTitles={rawTitles}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div id='article' className={`p-8 ${showMobileSidebar ? 'backdrop-brightness-50' : ''}`}>
        <div>
          <ReactMarkdown
            components={{
              h1: () => (
                <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
              ),
              h2: ({ node, ...props }) => (
                <h2 id={generateSlug(props.children)} {...props}></h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 id={generateSlug(props.children)} {...props}></h3>
              ),
              h4: ({ node, ...props }) => (
                <h4 id={generateSlug(props.children)} {...props}></h4>
              ),
              img: ({ node, ...props }) => (
                RenderImage(props)
              ),
              code: ({ node, ...props }) => {
                if (props.className === 'language-mermaid') {
                  return RenderMermaid(props)
                } else {
                  return RenderCodeBlock(props)
                }
              },
              table: ({node, ...props}) => {
                return (
                  <div className='p-2'>
                    <table className='border w-full' {...props}></table>
                  </div>
                )
              },
              span: ({node, ...props}) => { // done
                if (props.className === 'math math-inline') {
                  return <span className="math math-inline inline-flex">{props.children[0]}</span>;
                } else {
                  return props.children[0]
                }
              }
            }}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeMathjax]}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
      <div className="lg:hidden"> {/* Display SidebarLayout on screens smaller than "lg" */}
        <div className="fixed h-screen overflow-y-auto">
          <div className="fixed bottom-4 left-4 z-10">
            {showMobileSidebar ? (
              <SidebarLayout
                loggedIn={loggedIn}
                setting={setting}
                articleContent={markdownContent}
                rawTitles={rawTitles}
              />
            ) : (
              <></>
            )}
            <button
              className="items-center p-2 space-x-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring"
              onClick={() => {
                setShowMobileSidebar(!showMobileSidebar)
              }}
            >
              <MenuOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      <div>
        <ScrollToTopButton/>
      </div>
    </div>
  )
}

export default Article
