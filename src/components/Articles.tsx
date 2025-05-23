import * as React from "react";
import { NodesStructure } from "../types/nodes";

type Articles = {
  url: string;
  content: string;
}[];

const Articles = ({
  articles,
  nodesStructure,
}: {
  articles: Articles;
  nodesStructure: NodesStructure;
}) => {
  // Group articles by their category
  const groupedArticles = Object.values(articles).reduce(
    (acc, value) => {
      const category = value.url.split("/")[1];
      if (category == "in-progress") {
        return acc;
      }
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(value);
      return acc;
    },
    {} as Record<string, Articles>,
  );

  const list = Object.keys(groupedArticles).map((category, index) => (
    <div key={index} className="mb-6">
      <h2 className="font-bold text-gray-800 mb-4">{category}</h2>{" "}
      {/* Display category */}
      <div className="space-y-4">
        {groupedArticles[category].map((article, idx) => {
          const title = article.url.split("/")[2];
          // Check if the article is present in the nodesStructure
          const inNodeGraph = Object.prototype.hasOwnProperty.call(
            nodesStructure.nodes,
            article.url,
          );
          return (
            <div className="flex">
              <div
                key={idx}
                className="p-4 bg-gray-600 rounded-lg shadow-md hover:bg-gray-200"
              >
                <a href={article.url} className="text-black hover:underline">
                  {title}
                </a>
              </div>
              <div>
                <div>in node graph</div>
                <div>{inNodeGraph ? "Yes" : "No"}</div>
              </div>
              <div>parent</div>
              <div>children</div>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Articles</h1>
      {list}
    </div>
  );
};

export default Articles;
