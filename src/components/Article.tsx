import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { marked } from 'marked'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import SidebarLayout from './SidebarLayout'
import RenderImage from './RenderImage'
import RenderCodeBlock from './RenderCodeBlock'
import RenderMermaid from './RenderMermaid'
import ScrollToTopButton from './ScrollToTopButton'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
}

function Article({setting}: {
  setting: {
    url: string;
    date: string;
    category: string;
    publish: boolean;
  }
}) {
  const filePath = `posts/${setting['url']}.md`
  const [markdownContent, setMarkdownContent] = useState('')
  const [rawTitles, setRawTitles] = useState<Array<{ content: string, tagName: string }>>([])
  const [loggedIn, setLoggedIn] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const componentSidebarRef = useRef(null);

  const length = filePath.split('/').length
  const category = filePath.split('/')[length - 2]
  let articleName = filePath.split('/')[length - 1].split('.')[0]
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
      const tagNames = ['h2', 'h3', 'h4', 'h5', 'h6'];
      const tags = tagNames
        .flatMap(tagName => Array.from(container.querySelectorAll(tagName)))
        .map(tag => ({ content: tag.textContent || '', tagName: tag.tagName }));

      setRawTitles(tags);
    }
    importFileAndFetchContent()
  }, []);

  const generateSlug = (string: String) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    return str;
  };

  return (
    <div className='bg-gray-400 flex'>
      <div className='' ref={componentSidebarRef}>
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
      </div>
      <div id='article' className={`p-8 ${showMobileSidebar ? 'backdrop-brightness-50' : ''}`}>
        <div>
          <ReactMarkdown
            components={{
              h1: () => (
                <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
              ),
              h2: ({ node, ...props }) => {
                if (props.children) {
                  return <h2 id={generateSlug(props.children.toString())} {...props}></h2>
                } else {
                  return null;
                }
              },
              h3: ({ node, ...props }) => {
                if (props.children) {
                  return <h3 id={generateSlug(props.children.toString())} {...props}></h3>
                } else {
                  return null;
                }
              },
              h4: ({ node, ...props }) => {
                if (props.children) {
                  return <h4 id={generateSlug(props.children.toString())} {...props}></h4>
                } else {
                  return null;
                }
              },
              img: ({ node, ...props }) => (
                RenderImage({ ...props, src: props.src ?? '' })
              ),
              code: ({ node, ...props }: { node: any; children: React.ReactNode; className: string }) => {
                if (props.className === 'language-mermaid') {
                  return RenderMermaid(props)
                } else {
                  return RenderCodeBlock(props)
                }
              },
              table: ({...props}) => {
                return (
                  <div className='p-2'>
                    <table className='border w-full' {...props}></table>
                  </div>
                )
              },
              span: ({node, ...props}) => { // done
                if (props.className === 'math math-inline' && props.children) {
                  const content = props.children;
                  return <span className="math math-inline inline-flex">{content}</span>;
                } else {
                  return null
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
        <div className="fixed bottom-4 left-4 z-10 h-screen flex flex-col justify-end">
          {showMobileSidebar ? (
            <div className="overflow-y-auto">
              <SidebarLayout
                isCollapsed={false}
                loggedIn={loggedIn}
                setting={setting}
                articleContent={markdownContent}
                rawTitles={rawTitles}
              />
            </div>
          ) : (
            <></>
          )}
          <button
            className="items-center p-2 space-x-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring"
            onClick={() => {
              setShowMobileSidebar(!showMobileSidebar)
            }}
          >
            {/* <MenuOutlinedIcon /> */}
          </button>
        </div>
      </div>
      <div>
        <ScrollToTopButton/>
      </div>
    </div>
  )
}

export default Article
