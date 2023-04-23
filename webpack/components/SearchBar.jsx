import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    fetch('service/searchBar.json')
      .then(response => response.json())
      .then(data => {
        const { items } = data;
        setItems(items)
      })
      .catch(error => console.error(error));
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
      <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
      
      <ul>
        {searchResults.map(item => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
