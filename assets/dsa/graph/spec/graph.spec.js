const Graph = require('../examples/graph.js');

describe('Graph', () => {
  let testGraph
  beforeEach(() => {
    testGraph = new Graph();
    [1, 2, 3, 4].forEach(node => testGraph.addVertex(node));
    [[1, 2], [1, 4], [2, 4]].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
  })

  test('#init', () => {
    console.log(testGraph)
    expect(testGraph.getNeighbors(1)).toEqual([2, 4]);
    expect(testGraph.getNeighbors(2)).toEqual([1, 4]);
    expect(testGraph.getNeighbors(3)).toEqual([]);
    expect(testGraph.getNeighbors(4)).toEqual([1, 2]);
  })

  test('remove Edge', () => {
    testGraph.removeEdge(1, 2)
    expect(testGraph.getNeighbors(1)).toEqual([4]);
    expect(testGraph.getNeighbors(2)).toEqual([4]);
  })

  test('remove Vertex', () => {
    testGraph.removeVertex(1)
    expect(testGraph.getVertices()).toEqual([2, 3, 4]);
    expect(testGraph.getEdges()).toEqual();
  })

  test('DFS', () => {
    testGraph = new Graph();
    expectSet = new Set(['A', 'B', 'D', 'E', 'F', 'C']);
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(node => testGraph.addVertex(node));
    [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
    expect(testGraph.depthFirstSearch('A')).toEqual(expectSet);
  })

  test('BFS', () => {
    testGraph = new Graph();
    expectSet = new Set(['A', 'B', 'C', 'D', 'E', 'F']);
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(node => testGraph.addVertex(node));
    [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
    expect(testGraph.breadthFirstSearch('A')).toEqual(expectSet);
  })
})
