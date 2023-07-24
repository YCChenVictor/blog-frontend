import React from 'react';
import NodeGraph from './NodeGraph.jsx';
import SearchBar from './SearchBar.jsx';

const WebDevelopment = () => {
  return (
    <div className='bg-gray-400'>
      <p className='text-center text-6xl font-bold py-6'>Software</p>
      <div className='p-4'>
        <NodeGraph />
        <SearchBar />
      </div>
    </div>
  );
};

export default WebDevelopment;
