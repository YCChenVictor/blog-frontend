import React from 'react';
import NodeGraph from './NodeGraph';
import SearchBar from './SearchBar';

const Dashboard = ({
  category,
  serverOn
}: {
  category: string;
  serverOn: boolean;
}) => {
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <div className="bg-gray-400">
      <h1 className="text-center font-bold p-6">{title}</h1>
      <div className="p-4 rounded-lg m-4">
        <SearchBar />
      </div>
      <div className="p-4 rounded-lg m-4">
        {/* <NodeGraph category={category} showDrawAgain={serverOn} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
