import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import AuthorProfile from './components/AuthorProfile';
import Article from './components/Article';
// import UserInNav from './components/UserInNav';
import ArticleList from './components/ArticleList';
// import EditArticle from './components/AutoArticle/EditArticle'
// import { checkLoggedIn } from './utils/checkLoggedIn';
import settings from './data/articleSettings.json';
import { articleUrls } from './utils/loadArticles';

const App: React.FC = () => {
  const backendHost = process.env.REACT_APP_HOST_DEV;
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const articleRoutes = articleUrls.map((url) => {
    return (
      <Route
        path={url}
        element={
          <Article filePath={`../posts-submodule${url.replace('.', '')}.md`} />
        }
      />
    );
  });

  const fetchRequireData = async () => {
    if (!backendHost) {
      return;
    }

    const isServerOn = await axios.get(backendHost);
    if (isServerOn.status === 200) {
      setServerOn(true);
    }

    // const isLoggedInResponse = await checkLoggedIn();
    // setLoggedIn(isLoggedInResponse.loggedIn);
  };

  useEffect(() => {
    fetchRequireData();
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
                <Dashboard category={'web-development'} serverOn={serverOn} />
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
