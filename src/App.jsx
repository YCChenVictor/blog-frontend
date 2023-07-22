import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WebDevelopment from './components/WebDevelopment.jsx';
import AuthorProfile from './components/AuthorProfile.jsx';
import titleImg from './assets/img/title.jpeg'
import Article from './components/Article.jsx'
import settings from './data/articleSettings.json'

const Layout = () => {
  const desiredRoutes = Object.entries(settings).map(([key, value], index) => (
    <Route
      key={index}
      path={`blog/${value['url']}`}
      element={<Article setting={value} />}
    />
  ))
  return (
    <div className="bg-gray-700">
      <Router>
        <nav className="flex flex-wrap items-center justify-center px-2 py-4 mb-6">
          <a href="/blog" className="absolute left-0 top-0">
            <img className="p-4 w-16 rounded-full" src={titleImg} alt="title" />
          </a>
        </nav>
        <div>
          <Routes>
            <Route path="/blog" element={<AuthorProfile />}/>
            <Route path="/blog/software_engineering" element={<WebDevelopment />}/>
            {desiredRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
