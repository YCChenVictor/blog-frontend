import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Articles from './components/Articles';
import AuthorProfile from './components/AuthorProfile';
import Article from './components/Article.tsx';
import UserInNav from './components/UserInNav';
import ArticleList from './components/ArticleList';
import EditArticle from './components/AutoArticle/EditArticle';
import RenderFrontend from './components/AutoFrontend/RenderFrontend';

import { checkLoggedIn } from './utils/checkLoggedIn';

import titleImg from './assets/img/title.jpeg';
import settings from './data/articleSettings.json';

interface LayoutProps {}

function Layout(props: LayoutProps): JSX.Element {
  const helloWorldUrl = process.env.HOST_DEV;
  const [serverOn, setServerOn] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const articleRoutes = Object.entries(settings).map(([key, value], index) => (
    <Route
      key={index}
      path={`blog/${value['url']}`}
      element={<Article setting={value} />}
    />
  ));

  const fetchRequireData = async () => {
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
            <img className="w-16 rounded-full" src={titleImg} alt="title" />
          </a>
        </ul>
        <ul className="flex items-center space-x-4 ml-auto p-6">
          <a
            href="/blog/software"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Software
          </a>
        </ul>
        {serverOn && <ul className="space-x-4"><UserInNav /></ul>}
      </nav>
      <Router>
        <div className="">
          <Routes>
            <Route path="/blog/edit-article" element={<EditArticle />} />
            <Route path="/" element={<AuthorProfile />} />
            <Route path="/blog" element={<AuthorProfile />} />
            <Route
              path="/blog/software"
              element={<Articles category={'software'} loggedIn={loggedIn} />}
            />
            <Route
              path="/blog/gene"
              element={<Articles category={'gene'} loggedIn={loggedIn} />} />
            <Route
              path="/blog/aesthetics"
              element={<Articles category={'aesthetics'} loggedIn={loggedIn} />}
            />
            <Route
              path="/blog/article-list"
              element={<ArticleList articleSettings={settings} />}
            />
            <Route path="/auto-frontend" element={<RenderFrontend />} />
            {articleRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Layout;
