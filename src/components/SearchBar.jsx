import React, { useState, useEffect } from "react";
// import searchData from '../data/searchBar.json';

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // setItems(searchData['items'])
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
  
  // return (
  //   <div>
  //     <div>{searchResults.length}</div>
  //     <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
      
  //     <ul>
  //       {searchResults.map(item => (
  //         <li key={item.id}>
  //           <a href={item.url}>({item.category}) {item.title}</a>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default SearchBar;
