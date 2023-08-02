import React from 'react';
import NodeGraph from './NodeGraph.jsx';
import SearchBar from './SearchBar.jsx';

const Articles = ({category}) => {
  const title = category.charAt(0).toUpperCase() + category.slice(1)
  return (
    <div className='bg-gray-400'>
    <h1 className='text-center font-bold p-6'>{title}</h1>
      <div className='p-4'>
        <NodeGraph category={category} />
        {/* <SearchBar category={category} /> */}
      </div>
    </div>
  );
};

export default Articles;
