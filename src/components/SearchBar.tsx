import React, { useState, useEffect } from 'react';
import { importAllFilesAndFetchContents } from '../utils/loadArticles';

const SearchBar = ({articles}: { articles: { url: string; content: string }[] }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchArticles = () => {
    return articles.filter((article) => {
      const articleText = `${article.url} ${article.content}`.toLowerCase();
      const searchText = query.toLowerCase();

      return articleText.includes(searchText); // the core
    });
  };

  return (
    <div id="search-bar">
      <div>{searchArticles()?.length}</div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />

      {query && (
        <ul>
          {searchArticles()
            .sort((a, b) => (a.url > b.url ? 1 : -1))
            .map((article) => {
              if (article.url === '') {
                return;
              } else {
                return (
                  <div key={article.url}>
                    <a href={article.url}>{article.url}</a>
                  </div>
                );
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
