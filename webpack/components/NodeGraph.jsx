import React, { useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

function NodeGraph() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch('assets/javascript/nodeGraph.json')
      .then(response => response.json())
      .then(data => {
        const { nodes, links } = data;
        setNodes(nodes)
        setLinks(links)
      })
      .catch(error => console.error(error));
  }, []);

  return(
    <ForceGraph2D
      graphData={{ nodes, links }}
      nodeLabel="name"
    />
  )
}

export default NodeGraph;
