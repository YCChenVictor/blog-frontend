import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import Articles from "./components/Articles";
import { importAllFilesAndFetchContents } from "./utils/loadArticles";
import Main from "./components/Main";
import { NodesStructure } from "./types/nodes";

const App: React.FC = () => {
  const backendHost = process.env.REACT_APP_HOST_DEV ?? "";
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [articles, setArticles] = useState<{ url: string; content: string }[]>(
    [],
  );
  const [articleRoutes, setArticleRoutes] = useState<JSX.Element[]>([]);
  const [nodesStructure, setNodesStructure] = useState<NodesStructure>({
    nodes: [],
    links: [],
  });

  const checkServer = async () => {
    const serverResponse = await axios.get(backendHost);
    if (serverResponse.status === 200) {
      setServerOn(true);
    }
  };

  const importAll = (context: __WebpackModuleApi.RequireContext) => {
    return context.keys().map((key) => {
      return { url: key, staticUrl: context(key) as string };
    });
  };

  const handleRefreshNodes = async () => {
    try {
      // Sending a POST request to your backend
      const backendUrl = process.env.REACT_APP_BACKEND_URL ?? "";
      if (!backendUrl) {
        throw new Error("BACKEND_URL environment variable is not set");
      }
      const response = await fetch(backendUrl + "/refresh-nodes", {
        method: "POST", // or "GET" depending on your backend method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // You can include data in the body if needed
          key: "value", // Example data
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Handle the response
      const result = await response.json();
      console.log("Backend Response:", result);
      // Optionally, handle the result here, like redirecting or updating state
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNodesStructure((await import(`./node-structure.json`)).default);
        const markdownFiles = importAll(
          require.context("./posts-submodule/", true, /\.md$/),
        );
        checkServer().catch(console.error);
        const articles = await importAllFilesAndFetchContents(markdownFiles);
        setArticles(articles);
        setArticleRoutes(
          articles.map((item: { url: string; content: string }) => {
            return (
              <Route
                key={item.url}
                path={item.url}
                element={<Article filePath={item.url} content={item.content} />}
              />
            );
          }),
        );
      } catch (err) {
        console.error("error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-600 py-4">
      <div className="p-4">
        <a
          href="/"
          className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow inline-block text-center"
        >
          Homepage
        </a>
        {serverOn ? (
          <button
            onClick={() => {
              handleRefreshNodes();
            }}
            className="text-2xl font-bold text-gray-900 bg-gray-600 hover:bg-gray-400 px-4 py-2 rounded-lg shadow"
          >
            Refresh Nodes
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="prose p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <Router>
          <Routes>
            <Route
              path="/articles"
              element={
                <Articles articles={articles} nodesStructure={nodesStructure} />
              }
            />
            <Route
              path="/"
              element={<Main articles={articles} serverOn={serverOn} />}
            />
            {articleRoutes}
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
