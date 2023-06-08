const Graph = require('../examples/graph.js');

describe('Graph', () => {
  let testGraph
  beforeEach(() => {
    testGraph = new Graph();
    [1, 2, 3, 4].forEach(node => testGraph.addVertex(node));
    [[1, 2], [1, 4], [2, 4]].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
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
