import React from 'react';
import NodeGraph from './NodeGraph.jsx';
import SearchBar from './SearchBar.jsx';

const Articles = ({category}) => {
  return (
    <div className='bg-gray-400'>
      <p className='text-center text-6xl font-bold py-6'>{category}</p>
      <div className='p-4'>
        <NodeGraph category={category} />
        {/* <SearchBar category={category} /> */}
      </div>
    </div>
  );
};

export default Articles;
