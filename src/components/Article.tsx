import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import remarkMath from "remark-math";
import SidebarLayout from "./SidebarLayout";
import RenderCodeBlock from "./RenderCodeBlock";
import RenderMermaid from "./RenderMermaid";
import ScrollToTopButton from "./ScrollToTopButton";

const Article = ({
  filePath,
  content,
}: {
  filePath: string;
  content: string;
}) => {
  const [rawTitles, setRawTitles] = useState<
    { content: string; tagName: string }[]
  >([]);

  const componentSidebarRef = useRef(null);

  const length = filePath.split("/").length;
  const category = filePath.split("/")[length - 2];
  let articleName = filePath.split("/")[length - 1].split(".")[0];
  articleName = articleName.charAt(0).toUpperCase() + articleName.slice(1);

  const parseArticle = async () => {
    try {
      const parsedHTML = await marked.parse(content);
      const container = document.createElement("div");
      container.innerHTML = parsedHTML;
      const tagNames = ["h2", "h3", "h4", "h5", "h6"];
      const tags = tagNames
        .flatMap((tagName) => Array.from(container.querySelectorAll(tagName)))
        .map((tag) => ({
          content: tag.textContent ?? "",
          tagName: tag.tagName,
        }));

      setRawTitles(tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parseArticle().catch((error) => {
      console.log(error);
    });
  }, []);

  const generateSlug = (string: string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  return (
    <div className="bg-gray-400 flex">
      <div className="" ref={componentSidebarRef}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="hidden lg:block">
            {" "}
            {/* Hide SidebarLayout on screens smaller than "lg" */}
            <div className="p-2">
              {" "}
              {/* Add these classes */}
              <SidebarLayout
                isCollapsed={false}
                // loggedIn={true}
                // url={filePath} // TODO: fix this filePath, it should be the url or remove this one
                articleContent={content}
                rawTitles={rawTitles}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="article" className={`p-8`}>
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
                      id={generateSlug(JSON.stringify(props.children))}
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
                      id={generateSlug(JSON.stringify(props.children))}
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
                      id={generateSlug(JSON.stringify(props.children))}
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
                return className === "language-mermaid"
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
                if (props.className === "math math-inline" && props.children) {
                  const content = props.children;
                  return (
                    <span className="math math-inline inline-flex">
                      {content}
                    </span>
                  );
                } else {
                  return null;
                }
              },
            }}
            remarkPlugins={[remarkGfm, remarkMath]}
            // rehypePlugins={[rehypeMathjax]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="lg:hidden">
        {" "}
        {/* Display SidebarLayout on screens smaller than "lg" */}
      </div>
      <div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Article;
