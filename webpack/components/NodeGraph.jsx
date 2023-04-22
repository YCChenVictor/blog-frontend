import React, { useState, useEffect, useRef, useNavigate } from "react";
import ForceGraph2D from "react-force-graph-2d";

const NodeGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const forceRef = useRef();
  const borderStyle = {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "10px"
  };

  const handleNodeClick = (node) => {
    const baseUrl = 'http://localhost:4000' // going to import from site.url
    window.open(baseUrl + node.url, '_blank').focus();
  }

  useEffect(() => {
    forceRef.current.zoom(2, 300);
    fetch('assets/data/nodeGraph.json')
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
        ref={forceRef}
        graphData={{ nodes, links }}
        width={window.innerWidth}
        height={650}
        nodeRelSize={5}
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
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          ctx.textAlign = "center";
          ctx.font = `5px Sans-Serif`;
          ctx.fillStyle = "black";
          const lineHeight = 5;
          const lines = node.name.split("-");
          let x = node.x;
          let y = node.y - lineHeight;
          for (let i = 0; i < lines.length; ++i) {
            ctx.fillText(lines[i], x, y);
            y += lineHeight;
          }
        }}
      />
    </div>
  )
}

export default NodeGraph;
