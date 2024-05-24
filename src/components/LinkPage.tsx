import React from 'react';
import nodeGraph from '../data/software/nodeGraph.json';

const LinkPage = ({ articleUrl }) => {
  const nodes = nodeGraph.nodes;
  const links = nodeGraph.links;
  if (nodes.length === 0) return;
  if (links.length === 0) return;
  const pageNodeId = nodes.find((node) => {
    return node.url === `/blog/${articleUrl}`;
  }).id;
  const link = links.find((link) => {
    return link.target === pageNodeId;
  });

  if (link === undefined) {
    return <div className="px-4">{}</div>;
  } else {
    const sourceId = links.find((link) => {
      return link.target === pageNodeId;
    }).source;
    const sourcePage = nodes.find((node) => {
      return node.id === sourceId;
    });
    return (
      <div className="px-4">
        <a href={sourcePage.url} className="m-0 p-0">
          source page
        </a>
      </div>
    );
  }
};
export default LinkPage;
