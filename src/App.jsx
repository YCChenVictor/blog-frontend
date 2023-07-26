import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Software from './components/Software.jsx';
import AuthorProfile from './components/AuthorProfile.jsx';
import titleImg from './assets/img/title.jpeg'
import Article from './components/Article.jsx'
import settings from './data/articleSettings.json'
import ArticleList from './components/ArticleList.jsx'
import articleSettings from './data/articleSettings.json'

const Layout = () => {
  const desiredRoutes = Object.entries(settings).map(([key, value], index) => (
    <Route
      key={index}
      path={`blog/${value['url']}`}
      element={<Article setting={value} />}
    />
  ))
  return (
    <div className="bg-gray-700 relative">
      <Router>
        <nav className="sticky top-0">
          <a href="/blog" className="m-0 p-0">
            <img className="p-4 w-24 rounded-full" src={titleImg} alt="title" />
          </a>
        </nav>
        <div className="sticky top-0">
          <Routes>
            <Route path="/blog" element={<AuthorProfile />}/>
            <Route path="/blog/software" element={<Software />}/>
            <Route path="/blog/article_list" element={<ArticleList articleSettings={articleSettings} />}/>
            {desiredRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
