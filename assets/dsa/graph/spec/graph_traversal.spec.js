const GraphTraversal = require('../examples/graph_traversal.js')

describe('GraphTraversal', () => {
  let testGraph = new GraphTraversal();
  beforeEach(() => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(node => testGraph.addVertex(node));
    [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
  })

  test('DFS', () => {
    expect(testGraph.depthFirstSearch('A')).toEqual(new Set(['A', 'B', 'D', 'E', 'F', 'C']));
  })

  test('BFS', () => {
    expect(testGraph.breadthFirstSearch('A')).toEqual(new Set(['A', 'B', 'C', 'D', 'E', 'F']));
  })
})
