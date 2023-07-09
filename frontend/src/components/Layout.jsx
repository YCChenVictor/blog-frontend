import React from 'react';
import AuthorProfile from './AuthorProfile.jsx';
import Navigation from './Navigation.jsx';

const Layout = ({ author, content, timestamp }) => {
  return (
    <div className="pt-8 bg-gray-700">
      <Navigation />
      <AuthorProfile />
    </div>
  );
};

export default Layout;
