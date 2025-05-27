import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import { marked } from "marked";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import SidebarLayout from "./SidebarLayout";
import RenderCodeBlock from "./RenderCodeBlock";
import RenderMermaid from "./RenderMermaid";
import ScrollToTopButton from "./ScrollToTopButton";
import LinkPage from "./LinkPage";
import nodeStructure from "../node-structure.json";
import { useServer } from "./ServerProvider";

const Article = ({
  filePath,
  content,
  parents,
  children,
}: {
  filePath: string;
  content: string;
  parents: string[];
  children: string[];
}) => {
  const [rawTitles, setRawTitles] = useState<
    { content: string; tagName: string }[]
  >([]);
  const { serverOn } = useServer();

  const componentSidebarRef = useRef(null);
  const filePathSplit = filePath.split("/");
  const articleName = filePathSplit.pop() || "undefined";
  let category = filePathSplit.pop();
  if (!category) {
    category = "base";
  }

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
    <div className="bg-gray-400 flex min-h-screen w-full">
      <div className="" ref={componentSidebarRef}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="hidden lg:block">
            {serverOn ? (
              <LinkPage
                self={`${category}/${articleName}`}
                allNodes={nodeStructure.nodes.map((item) => item.key)}
                parents={parents}
                children={children}
              />
            ) : (
              <></>
            )}
            <div className="p-2">
              <SidebarLayout
                isCollapsed={false}
                articleContent={content}
                rawTitles={rawTitles}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="article" className="p-8">
        <div>
          <ReactMarkdown
            components={{
              h1: () => (
                <h1 className="text-center">{`(${category}) ${articleName}`}</h1>
              ),
              h2: ({ children, ...props }) =>
                children ? (
                  <h2
                    id={generateSlug(React.Children.toArray(children).join(""))}
                    {...props}
                  >
                    {children}
                  </h2>
                ) : null,
              h3: ({ children, ...props }) =>
                children ? (
                  <h3
                    id={generateSlug(React.Children.toArray(children).join(""))}
                    {...props}
                  >
                    {children}
                  </h3>
                ) : null,
              h4: ({ children, ...props }) =>
                children ? (
                  <h4
                    id={generateSlug(React.Children.toArray(children).join(""))}
                    {...props}
                  >
                    {children}
                  </h4>
                ) : null,
              code: ({ children, className }) =>
                className === "language-mermaid" ? (
                  <RenderMermaid>{children}</RenderMermaid>
                ) : (
                  <RenderCodeBlock className={className}>
                    {children}
                  </RenderCodeBlock>
                ),
              table: ({ ...props }) => (
                <div className="p-2">
                  <table className="border w-full" {...props}></table>
                </div>
              ),
              span: ({ ...props }) => <span {...props} />,
            }}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="lg:hidden"> </div>
      <div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Article;
