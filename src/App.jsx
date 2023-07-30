import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from './components/Articles.jsx';
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
    <div className="bg-gray-700">
      <Router>
        <nav className="pb-20">
          <ul className="fixed z-10 bg-gray-700 w-full">
            <a href="/blog" className="m-0 p-0">
              <img className="p-4 w-24 rounded-full" src={titleImg} alt="title" />
            </a>
          </ul>
        </nav>
        <div className="">
          <Routes>
            <Route path="/blog" element={<AuthorProfile />}/>
            <Route path="/blog/software" element={<Articles category={'software'} />}/>
            <Route path="/blog/medicine" element={<Articles category={'medicine'} />}/>
            <Route path="/blog/aesthetics" element={<Articles category={'aesthetics'} />}/>
            <Route path="/blog/article_list" element={<ArticleList articleSettings={articleSettings} />}/>
            {desiredRoutes}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Layout;
