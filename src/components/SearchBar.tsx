import React, { useState, useEffect } from 'react';
import { importAllFilesAndFetchContent } from '../utils/loadArticles';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<{ url: string; content: string }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchItems = () => {
    return items.filter((item) => {
      const itemText = `${item.url} ${item.content}`.toLowerCase();
      const searchText = query.toLowerCase();

      return itemText.includes(searchText); // the core
    });
  };

  useEffect(() => {
    Promise.all([importAllFilesAndFetchContent()])
      .then((items) => {
        return setItems(...items);
      })
      .catch(console.error); // Add error handling
  }, []);

  return (
    <div id="search-bar">
      <div>{searchItems().length}</div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />

      {query && (
        <ul>
          {searchItems()
            .sort((a, b) => (a.url > b.url ? 1 : -1))
            .map((item, index) => {
              if (item.url === '') {
                return;
              } else {
                return (
                  <div key={item.url}>
                    <a href={item.url}>{item.url}</a>
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
