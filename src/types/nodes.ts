import { SimulationNodeDatum } from "d3";

interface Node extends SimulationNodeDatum {
  key: string;
  name: string;
  group: string;
  color: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface Link {
  source: number;
  target: number;
}

interface NodesStructure {
  nodes: Node[];
  links: Link[];
}

export { Node, Link, NodesStructure };
