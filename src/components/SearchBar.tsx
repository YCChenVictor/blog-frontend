import React, { useState, useEffect } from 'react';
import searchData from '../data/software/searchBar.json';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<
    { title: string; content: string; url: string }[]
  >([]); // Update the type of the items state variable

  useEffect(() => {
    setItems(searchData['items']);
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function searchItems() {
    return items.filter((item) => {
      const itemText = `${item.title} ${item.content}`.toLowerCase();
      const searchText = query.toLowerCase();

      return itemText.includes(searchText); // the core
    });
  }

  const searchResults = searchItems();

  return (
    <div id="search-bar">
      <div>{searchResults.length}</div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />

      <ul>
        {searchResults
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((item, index) => {
            if (item.title === '') {
              return;
            } else {
              return (
                <div key={item.url}>
                  <a href={item.url}>{item.title}</a>
                </div>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default SearchBar;
