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
    const url = window.location.href
    const pathname = window.location.pathname
    const baseUrl = url.replace(pathname, "");
    window.open(baseUrl + node.url, '_blank').focus();
  }

  useEffect(() => {
    forceRef.current.zoom(2, 300);
    fetch('service/nodeGraph.json')
      .then(response => response.json())
      .then(data => {
        const { nodes, links } = data;
        nodes.map((node) => {
          if (node['id'] == 1) {
            node['val'] = 5
          } else {
            node['val'] = 1
          }
        })
        setNodes(nodes)
        setLinks(links)
        setTimeout(function() { // Give it time to render
          const linkLengthConstant = 20
          forceRef.current.d3Force('link').distance((link) => {
            if(link.source.id == 1) {
              return linkLengthConstant
            } else {
              return linkLengthConstant * (link.source.val + link.target.val) 
            }
          });
          forceRef.current.centerAt(nodes[0].x, nodes[0].y, 400);
        }, 1000)
      })
      .catch(error => console.error(error));
  }, []);

  return(
    <div style={borderStyle}>
      <ForceGraph2D
        ref={forceRef}
        graphData={{ nodes, links }}
        width={document.getElementById("node-graph").offsetWidth - 48}
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
