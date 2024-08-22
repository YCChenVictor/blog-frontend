import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { marked } from 'marked'; // may need to remove this one
import remarkMath from 'remark-math';
// import rehypeMathjax from 'rehype-mathjax';
import SidebarLayout from './SidebarLayout';
// import RenderImage from './RenderImage';
import RenderCodeBlock from './RenderCodeBlock';
import RenderMermaid from './RenderMermaid';
import ScrollToTopButton from './ScrollToTopButton';
// import { importFileAndFetchContent } from '../utils/loadArticles';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Article({ filePath, content }: { filePath: string, content: string }) {
  const [rawTitles, setRawTitles] = useState<
    { content: string; tagName: string }[]
  >([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const componentSidebarRef = useRef(null);

  const length = filePath.split('/').length;
  const category = filePath.split('/')[length - 2];
  let articleName = filePath.split('/')[length - 1].split('.')[0];
  articleName = articleName.charAt(0).toUpperCase() + articleName.slice(1);

  const parseArticle = async () => {
    try {
      const parsedHTML = await marked.parse(content);
      const container = document.createElement('div');
      container.innerHTML = parsedHTML;
      const tagNames = ['h2', 'h3', 'h4', 'h5', 'h6'];
      const tags = tagNames
        .flatMap((tagName) => Array.from(container.querySelectorAll(tagName)))
        .map((tag) => ({
          content: tag.textContent ?? '',
          tagName: tag.tagName
        }));

      setRawTitles(tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parseArticle().catch((error) => {console.log(error)});
  }, []);

  const generateSlug = (string: string) => {
    let str = string.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return str;
  };

  return (
    <div className="bg-gray-400 flex">
      <div className="" ref={componentSidebarRef}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="hidden lg:block">
            {' '}
            {/* Hide SidebarLayout on screens smaller than "lg" */}
            <div className="p-2">
              {' '}
              {/* Add these classes */}
              <button
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}
              >
                {/* <MenuOutlinedIcon /> */}
              </button>
              <SidebarLayout
                isCollapsed={isCollapsed}
                // loggedIn={true}
                // url={filePath} // TODO: fix this filePath, it should be the url or remove this one
                articleContent={content}
                rawTitles={rawTitles}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="article"
        className={`p-8 ${showMobileSidebar ? 'backdrop-brightness-50' : ''}`}
      >
        <div>
          <ReactMarkdown
            components={{
              h1: () => (
                <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
              ),
              h2: ({ ...props }) => {
                if (props.children) {
                  return (
                    <h2
                      id={generateSlug(props.children.toString())}
                      {...props}
                    ></h2>
                  );
                } else {
                  return null;
                }
              },
              h3: ({ ...props }) => {
                if (props.children) {
                  return (
                    <h3
                      id={generateSlug(props.children.toString())}
                      {...props}
                    ></h3>
                  );
                } else {
                  return null;
                }
              },
              h4: ({ ...props }) => {
                if (props.children) {
                  return (
                    <h4
                      id={generateSlug(props.children.toString())}
                      {...props}
                    ></h4>
                  );
                } else {
                  return null;
                }
              },
              // img: ({ ...props }) =>
              //   RenderImage({ ...props, src: props.src ?? '' }),
              // @ts-expect-error - The types for RenderMermaid and RenderCodeBlock are not compatible with the expected types here, but we know this code works
              code: ({
                children,
                className,
              }: {
                children: React.ReactNode;
                className: string;
              }) => {
                return className === 'language-mermaid' 
                  ? RenderMermaid({ children }) 
                  : RenderCodeBlock({ children, className });
              },
              table: ({ ...props }) => {
                return (
                  <div className="p-2">
                    <table className="border w-full" {...props}></table>
                  </div>
                );
              },
              span: ({ ...props }) => {
                // done
                if (props.className === 'math math-inline' && props.children) {
                  const content = props.children;
                  return (
                    <span className="math math-inline inline-flex">
                      {content}
                    </span>
                  );
                } else {
                  return null;
                }
              }
            }}
            remarkPlugins={[remarkGfm, remarkMath]}
            // rehypePlugins={[rehypeMathjax]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="lg:hidden">
        {' '}
        {/* Display SidebarLayout on screens smaller than "lg" */}
        <div className="fixed bottom-4 left-4 z-10 h-screen flex flex-col justify-end">
          {showMobileSidebar ? (
            <div className="overflow-y-auto">
              {/* <SidebarLayout
                isCollapsed={false}
                loggedIn={loggedIn}
                setting={setting}
                articleContent={markdownContent}
                rawTitles={rawTitles}
              /> */}
            </div>
          ) : (
            <></>
          )}
          <button
            className="items-center p-2 space-x-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring"
            onClick={() => {
              setShowMobileSidebar(!showMobileSidebar);
            }}
          >
            {/* <MenuOutlinedIcon /> */}
          </button>
        </div>
      </div>
      <div>
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default Article;
