import React, { useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const NodeGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const borderStyle = { // TODO: try to know why Tailwind does not work
    border: "1px solid black",
    borderRadius: "10px",
    padding: "10px"
  };

  const handleNodeClick = (node) => {
    // Redirect to a new path
    console.log(node.name)
    // history.push(`/node/${node.id}`);
  }

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
    <div style={borderStyle}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        width={window.innerWidth}
        height={650}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowResolution={0}
        d3VelocityDecay={0.6} // Decrease velocity decay to reduce node overlap
        d3Force="charge" // Use only charge force
        d3AlphaDecay={0.03} // Decrease alpha decay to increase simulation time
        d3Charge={-80} // Decrease charge to reduce node repulsion
        d3LinkDistance={80} // Increase link distance to reduce link overlap
        enableZoomPanInteraction={true} // Enable zooming
        onNodeClick={handleNodeClick} // redirect to the page when click node
      />
    </div>
  )
}

export default NodeGraph;
