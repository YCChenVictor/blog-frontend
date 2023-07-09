import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import SidebarLayout from './SidebarLayout.jsx'
import { marked } from "marked";

const Article = ({filePath}) => {
  console.log(filePath)
  const [markdownContent, setMarkdownContent] = useState('');
  const [rawTitles, setRawTitles] = useState([]);

  useEffect(() => { // try to dynamic import from filePath
    const importFileAndFetchContent = async () => {
    const fileModule = await import(`../${filePath}`);
    const response = await fetch(fileModule.default);
    const text = await response.text();

    const parsedHTML = marked.parse(text);
    const container = document.createElement('div');
    container.innerHTML = parsedHTML;

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
      <div className='bg-gray-400 pl-24 sm:pl-24 md:pl-24 lg:pl-36 xl:pl-72 2xl:pxl-72'>
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 id={generateSlug(props.children[0])} {...props}></h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 id={generateSlug(props.children[0])} {...props}></h3>
            ),
            h4: ({ node, ...props }) => (
              <h4 id={generateSlug(props.children[0])} {...props}></h4>
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Article
