import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import Articles from "./components/Articles";
import { importAllFilesAndFetchContents } from "./utils/loadArticles";
import Main from "./components/Main";

const App: React.FC = () => {
  const backendHost = process.env.REACT_APP_HOST_DEV ?? "";
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [articles, setArticles] = useState<{ url: string; content: string }[]>(
    [],
  );
  const [articleRoutes, setArticleRoutes] = useState<JSX.Element[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const markdownFiles = importAll(
          require.context("./posts-submodule/", true, /\.md$/),
        );
        checkServer().catch(console.error);
        importAllFilesAndFetchContents(markdownFiles)
          .then((articles) => {
            setArticles(articles);
            setArticleRoutes(
              articles.map((item: { url: string; content: string }) => {
                return (
                  <Route
                    key={item.url}
                    path={item.url}
                    element={
                      <Article filePath={item.url} content={item.content} />
                    }
                  />
                );
              }),
            );
          })
          .catch(console.error);
      } catch (err) {
        console.error("Failed to load nodeGraph.json", err);
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
      </div>
      <div className="prose p-4 mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <Router>
          <Routes>
            <Route
              path="/articles"
              element={<Articles articles={articles} />}
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
