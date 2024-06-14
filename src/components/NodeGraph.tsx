import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import articleSettings from '../data/articleSettings.json';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';

const NodeGraph = ({
  category,
  showDrawAgain
}: {
  category: string;
  showDrawAgain: boolean;
}) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const forceRef = useRef();

  const handleNodeClick = (node: { url: string }) => {
    const url = window.location.href;
    const pathname = window.location.pathname;
    const baseUrl = url.replace(pathname, '');
    if (node) {
      window.open(baseUrl + node.url, '_blank');
    }
  };

  const generateNodes = async (category: string) => {
    const url = `${process.env.REACT_APP_HOST_DEV}node-graph/create?category=${category}`;
    const postData = { category: category };
    axios.post(url, postData);
  };

  const fetchNodeData = async () => {
    const nodeData = await import(`../data/${category}/nodeGraph.json`); // After deploy backend, should get from backend
    let { nodes, links } = nodeData;

    if (nodes === undefined || links === undefined) {
      return false;
    }

    nodes.map((node: { id: number; val: number }) => {
      // refine this size modification
      if (node.id === 1) {
        return (node.val = 5);
      } else {
        return (node.val = 1);
      }
    });
    const nodeCondition = Object.entries(articleSettings)
      .map(([key, value], index) => {
        return { [value.url]: value.publish };
      })
      .reduce((result, currentObj) => {
        return { ...result, ...currentObj };
      }, {});

    const removedNode: string[] = [];
    nodes = nodes.filter((node: { id: string; url: string }) => {
      if (nodeCondition[node.url.replace('/blog/', '')]) {
        return true;
      } else {
        removedNode.push(node.id);
        return false;
      }
    });
    links = links.filter((link: { source: string; target: string }) => {
      if (
        removedNode.includes(link.source) ||
        removedNode.includes(link.target)
      ) {
        return false;
      } else {
        return true;
      }
    });
    setNodes(nodes);
    setLinks(links);
    return true;
  };

  useEffect(() => {
    // please extract following as method
    if (forceRef?.current) {
      (forceRef.current as any).zoom(2, 300); // fix it later
    }

    // fetchNodeData().then((success) => {
    //   if (!success) return;
    //   setTimeout(function () {
    //     // Give it time to render
    //     const linkLengthConstant = 20;
    //     if (forceRef.current) {
    //       (forceRef.current as any).d3Force('link').distance((link: any) => {
    //         // Explicitly define the type of 'link' as any
    //         if (link.source.id === 1) {
    //           return linkLengthConstant;
    //         } else {
    //           return linkLengthConstant * (link.source.val + link.target.val);
    //         }
    //       });
    //     }
    //     // forceRef.current.centerAt(nodes[0].x, nodes[0].y, 400) // fix it later
    //   }, 500);
    // });
  }, []);

  return (
    <div id="node-graph">
      {showDrawAgain ? (
        <button
          onClick={() => generateNodes(category)}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Draw Again
        </button>
      ) : null}
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ForceGraph2D
          ref={forceRef}
          graphData={{ nodes, links }}
          height={window.innerHeight}
          width={window.innerWidth * 0.75}
          nodeRelSize={5}
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowLength={5}
          d3VelocityDecay={0.6} // Decrease velocity decay to reduce node overlap
          d3AlphaDecay={0.03} // Decrease alpha decay to increase simulation time
          onNodeClick={handleNodeClick} // redirect to the page when click node
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx) => {
            ctx.textAlign = 'center';
            ctx.font = '5px Sans-Serif';
            ctx.fillStyle = 'black';
            const lineHeight = 5;
            const lines = node.name.split('-');
            const x = node.x ?? 0;
            let y = (node.y ?? 0) - lineHeight;
            for (let i = 0; i < lines.length; ++i) {
              ctx.fillText(lines[i], x, y);
              y += lineHeight;
            }
          }}
        />
      </ErrorBoundary>
    </div>
  );
};

export default NodeGraph;
