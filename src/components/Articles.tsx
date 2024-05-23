import React from 'react';
import NodeGraph from './NodeGraph';
import SearchBar from './SearchBar';

const Articles = ({category, loggedIn}: {category: string, loggedIn: boolean}) => {
  const title = category.charAt(0).toUpperCase() + category.slice(1)
  return (
    <div className='bg-gray-400'>
      <h1 className='text-center font-bold p-6'>
        {title}
      </h1>
      <div className='lg:flex h-auto'>
        <div className='lg:w-3/4 p-4 border border-black rounded-lg m-4'>
          <NodeGraph category={category} loggedIn={loggedIn} />
        </div>
        <div className='lg:w-1/4 p-4 border border-black rounded-lg m-4'>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Articles;
