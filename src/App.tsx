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
import { checkLoggedIn } from './utils/checkLoggedIn';
import settings from './data/articleSettings.json';
import { fileUrls } from './utils/loadArticles';

const App: React.FC = () => {
  const helloWorldUrl = process.env.REACT_APP_HOST_DEV;
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const articleRoutes = fileUrls.map((fileUrl) => {
    return (
      <Route
        path={'/concept/complexity'}
        element={<Article url={'/concept/complexity'} />}
      />
    );
  });

  const fetchRequireData = async () => {
    if (!helloWorldUrl) {
      return;
    }

    try {
      const isServerOn = await axios.get(helloWorldUrl);
      setServerOn(isServerOn.data); // Assuming the server response indicates its status.
    } catch (error) {
      setServerOn(false);
    }

    if (serverOn) return;

    const isLoggedInResponse = await checkLoggedIn();
    setLoggedIn(isLoggedInResponse.loggedIn);
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
        {(serverOn as boolean) ? (
          <ul className="space-x-4">{/* <UserInNav /> */}</ul>
        ) : null}
      </nav>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<AuthorProfile />} />
            <Route
              path="/software-dashboard"
              element={<Dashboard category={'software'} loggedIn={loggedIn} />}
            />
            {articleRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
