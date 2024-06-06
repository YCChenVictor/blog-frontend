import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<{ url: string; content: string }[]>([]);

  // should extract as a service
  const fetchFileContent = (file) =>
    fetch(file.content)
      .then((response) => response.text())
      .then((content) => ({
        url: file.filename.replace('.md', ''),
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
  ).filter((file) => !file.filename.includes('in-progress'));

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
      const itemText = `${item.url} ${item.content}`.toLowerCase();
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
