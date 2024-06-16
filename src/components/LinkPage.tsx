// import React from 'react';
// import nodeGraph from '../posts-submodule/nodeGraph.json';

// const LinkPage = ({ articleUrl }: { articleUrl: string }) => {
//   const nodes = nodeGraph.nodes;
//   const links = nodeGraph.links;
//   if (nodes.length === 0) return;
//   if (links.length === 0) return;
//   const pageNode = nodes.find((node) => {
//     return node.url === `/blog/${articleUrl}`;
//   });
//   const pageNodeId = pageNode ? pageNode.id : null;
//   const link = links.find((link) => {
//     return link.target === pageNodeId;
//   });

//   if (link === undefined) {
//     return <div className="px-4">{}</div>;
//   } else {
//     const sourceId = links.find((link) => {
//       return link.target === pageNodeId;
//     })?.source; // Add null check using optional chaining operator
//     const sourcePage = nodes.find((node) => {
//       return node.id === sourceId;
//     });
//     return (
//       <div className="px-4">
//         <a href={sourcePage?.url} className="m-0 p-0"> // Add null check using optional chaining operator
//           source page
//         </a>
//       </div>
//     );
//   }
// };
// export default LinkPage;
