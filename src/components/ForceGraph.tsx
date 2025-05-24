import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type Node = d3.SimulationNodeDatum & {
  id: string;
  name: string;
  url: string;
  color: string;
};
type Link = d3.SimulationLinkDatum<Node> & {
  source: string;
  target: string;
};

interface NodeData {
  nodes: Node[];
  links: Link[];
}

const ForceGraph = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setNodes] = useState<Node[]>([]);
  const [, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const run = async () => {
      const rawData = (await import(`../nodeGraph.json`)).default;
      if (
        !rawData.nodes ||
        !rawData.links ||
        !ref.current ||
        !containerRef.current
      )
        return;

      const nodes: Node[] = rawData.nodes.map(
        (n: {
          id: string | number;
          name: string;
          url: string;
          color: string;
        }) => ({
          id: String(n.id),
          name: n.name,
          url: n.url,
          color: n.color,
        }),
      );

      const links: Link[] = rawData.links.map(
        (l: { source: string | number; target: string | number }) => ({
          source: String(l.source),
          target: String(l.target),
        }),
      );

      setNodes(nodes);
      setLinks(links);

      const nodeData: NodeData = { nodes, links };

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const svg = d3
        .select(ref.current)
        .attr("width", width)
        .attr("height", height);
      const zoomG = svg.append("g");

      d3.select(ref.current).call(
        d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.1, 10])
          .on("zoom", (event) => {
            zoomG.attr("transform", event.transform);
          }),
      );

      const simulation = d3
        .forceSimulation<Node>(nodeData.nodes)
        .force(
          "link",
          d3.forceLink<Node, Link>(nodeData.links).id((d) => d.id),
        )
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = zoomG
        .append("g")
        .selectAll("line")
        .data(nodeData.links)
        .join("line")
        .attr("stroke", "#999");

      const node = zoomG
        .append("g")
        .selectAll<SVGCircleElement, Node>("circle")
        .data(nodeData.nodes)
        .join("circle")
        .attr("r", 10)
        .attr("fill", (d) => d.color)
        .call(
          d3
            .drag<SVGCircleElement, Node>()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }),
        )
        .on("click", (_, d) => {
          window.open(d.url, "_blank");
        });

      const label = zoomG
        .append("g")
        .selectAll("text")
        .data(nodeData.nodes)
        .join("text")
        .text((d) => d.name)
        .attr("font-size", 12)
        .attr("fill", "#000")
        .attr("text-anchor", "middle");

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => (d.source as Node).x ?? 0)
          .attr("y1", (d) => (d.source as Node).y ?? 0)
          .attr("x2", (d) => (d.target as Node).x ?? 0)
          .attr("y2", (d) => (d.target as Node).y ?? 0);

        node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
        label.attr("x", (d) => d.x ?? 0).attr("y", (d) => (d.y ?? 0) - 14);
      });
    };

    run();
  }, []);

  return (
    <div>
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}>
      <svg ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
    </div>
  );
};

export default ForceGraph;
