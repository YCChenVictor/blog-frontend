declare module 'nodeGraphJson' {
  interface NodeType { id: number; name: string; url: string; color: string; }
  interface LinkType { source: number; target: number; }
  interface NodeData {
    nodes: NodeType[];
    links: LinkType[];
  }

  const value: NodeData;
  export default value;
}
