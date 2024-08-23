import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthorProfile from './components/AuthorProfile';
import Article from './components/Article';
// import UserInNav from './components/UserInNav';
// import ArticleList from './components/ArticleList';
// import EditArticle from './components/AutoArticle/EditArticle'
// import { checkLoggedIn } from './utils/checkLoggedIn';
// import settings from './data/articleSettings.json';
import { importAllFilesAndFetchContents } from './utils/loadArticles';

const App: React.FC = () => {
  const backendHost = process.env.REACT_APP_HOST_DEV ?? '';
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [articles, setArticles] = useState<{ url: string; content: string }[]>([]);
  const [articleRoutes, setArticleRoutes] = useState<JSX.Element[]>([]);

  const checkServer = async () => {
    const serverResponse = await axios.get(backendHost);
    if (serverResponse.status === 200) {
      setServerOn(true);
    }
  }

  const importAll = (context: __WebpackModuleApi.RequireContext) => {
    return context.keys().map((key) => {
      return { url: key, staticUrl: context(key) as string };
    });
  }

  useEffect(() => {
    const markdownFiles = importAll(require.context('./posts-submodule/', true, /\.md$/));
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
          })
        );
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-700">
      <nav className="flex items-center justify-between bg-gray-700 p-4">
        <ul className="bg-gray-700">
          <a href="/" className="m-0 p-0">
            <img
              className="w-16 rounded-full"
              src={process.env.REACT_APP_ROOT_URL + 'assets/img/title.jpeg'}
              alt="title"
            />
          </a>
        </ul>
        <ul className="flex items-center space-x-4 ml-auto p-6">
          <a
            href="/software-dashboard"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Web Development
          </a>
        </ul>
        {(serverOn) ? (
          <ul className="space-x-4">{/* <UserInNav /> */}</ul>
        ) : null}
      </nav>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<AuthorProfile />} />
            <Route
              path="/software-dashboard"
              element={
                <Dashboard articles={articles} category={'web-development'} serverOn={serverOn} />
              }
            />
            {articleRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
