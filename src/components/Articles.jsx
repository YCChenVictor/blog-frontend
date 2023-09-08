import React from 'react';
import NodeGraph from './NodeGraph.jsx';
import SearchBar from './SearchBar.jsx';

const Articles = ({category, loggedIn}) => {
  const title = category.charAt(0).toUpperCase() + category.slice(1)
  return (
    <div className='bg-gray-400'>
    <h1 className='text-center font-bold p-6'>{title}</h1>
    <div className='flex h-auto'>
      <div className='w-3/4'>
        <NodeGraph category={category} loggedIn={loggedIn} />
      </div>
      <div className='w-1/4'>
        <SearchBar category={category} />
      </div>
    </div>
    </div>
  );
};

export default Articles;
