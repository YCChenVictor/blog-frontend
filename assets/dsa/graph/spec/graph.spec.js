const Graph = require('../examples/graph.js');

describe('Graph', () => {
  let testGraph;
  const nodes = [1, 2, 3, 4];
  const edges = [
    [1, 2],
    [1, 4],
    [2, 4],
  ]

  beforeEach(() => {
    testGraph = new Graph();
    nodes.forEach(node => testGraph.addVertex(node))
    edges.forEach(edge => testGraph.addEdge(edge[0], edge[1]))
    console.log(testGraph.vertices)
  })

  test('#init', () => {
    expect(testGraph.getNeighbors(1)).toEqual([2, 4]);
    expect(testGraph.getNeighbors(2)).toEqual([1, 4]);
    expect(testGraph.getNeighbors(3)).toEqual([]);
    expect(testGraph.getNeighbors(4)).toEqual([1, 2]);
  })
})
