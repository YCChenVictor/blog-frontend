import React from "react";
import NodeGraph from "./NodeGraph";
import SearchBar from "./SearchBar";
import AuthorProfile from "./AuthorProfile";

interface MainProps {
  articles: any[]; // Replace 'any' with the actual article type if available
  serverOn: boolean;
}

const Main: React.FC<MainProps> = ({ articles, serverOn }) => {
  return (
    <>
      <div className="lg:w-1/3  p-4">
        <AuthorProfile />
      </div>
      <div className=" w-full lg:w-2/3">
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow-md">
            <SearchBar articles={articles} />
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <NodeGraph category={""} showDrawAgain={serverOn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
