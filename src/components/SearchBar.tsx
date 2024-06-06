import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<{ filename: string; content: string }[]>(
    []
  );

  // should extract as a service
  const fetchFileContent = (file) =>
    fetch(file.content)
      .then((response) => response.text())
      .then((content) => ({
        // Remove extra closing parenthesis here
        filename: file.filename,
        content
      }));
  const importAllFiles = (context) =>
    context.keys().map((filename) => ({
      filename,
      content: context(filename)
    }));
  // array of hashes, {filename: string, content: string}
  const markdownFiles = importAllFiles(
    require.context('../posts-submodule', true, /\.md$/)
  );

  useEffect(() => {
    Promise.all(markdownFiles.map(fetchFileContent))
      .then((items) => {
        setItems(items);
      })
      .catch(console.error); // Add error handling
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function searchItems() {
    return items.filter((item) => {
      const itemText = `${item.filename} ${item.content}`.toLowerCase();
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

      {query && (
        <ul>
          {searchResults
            .sort((a, b) => (a.filename > b.filename ? 1 : -1))
            .map((item, index) => {
              if (item.filename === '') {
                return;
              } else {
                return (
                  <div key={item.filename}>
                    <a href={item.filename}>{item.filename}</a>
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
