import React, { useState, useEffect } from "react";
import searchData from '../data/software/searchBar.json';

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setItems(searchData['items'])
  }, []);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }
  
  function searchItems() {
    return items.filter(item => {
      const itemText = `${item.title} ${item.content}`.toLowerCase();
      const searchText = query.toLowerCase();
      
      return itemText.includes(searchText); // the core
    });
  }
  
  const searchResults = searchItems();
  
  return (
    <div>
      <div>{searchResults.length}</div>
      <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />

      <ul>
        {searchResults.map(item => {
          return (
            <div>
              <a href={item.url}>{item.title}</a>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default SearchBar;
