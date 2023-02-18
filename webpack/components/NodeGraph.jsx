import React, { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NodeGraph() {
  const data = { // the data structure required for node graph
    nodes: [
      {
        id: "0",
        isClusterNode: true,
        name: "project, idea, user",
        size: 9.785932721712538,
        href: "http://127.0.0.1:4000/blog/0_self/1993/09/01/software.html"
      },
      {
        id: "project",
        name: "project",
        centrality: 0.10021091790578693,
        degrees: 35,
        href: "http://127.0.0.1:4000/blog/0_self/project.html"
      },
      {
        id: "idea",
        name: "idea",
        centrality: 0.03469693187854244,
        degrees: 29,
        href: "http://127.0.0.1:4000/blog/0_self/idea.html"
      },
      {
        id: "user",
        name: "user",
        centrality: 0.025406514132413013,
        degrees: 27,
        href: "http://127.0.0.1:4000/blog/0_self/user.html"
      },
    ],
    links: [
      {
        source: "0",
        target: "project"
      },
      {
        source: "0",
        target: "idea"
      },
      {
        source: "0",
        target: "user"
      },
    ]
  };

  const graphData = useMemo(() => { // cache the data
    return {
      nodes: data.nodes,
      links: data.links
    };
  }, []);

  const handleNodeClick = (node) => { // click and redirect to the href
    window.location.href = node.href;
  };

  return(
    <ForceGraph2D // draw it with 2D graph with the nodes and links
      graphData={graphData}
      onNodeClick={handleNodeClick}
    />
  )
}

export default NodeGraph;
