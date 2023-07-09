const Graph = require('../examples/graph.js');

describe('Graph', () => {
  let testGraph
  beforeEach(() => {
    testGraph = new Graph();
    [1, 2, 3, 4].forEach(node => testGraph.addVertex(node));
    [[1, 2], [1, 4], [2, 4]].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
  })

  test('#init', () => {
    expect(testGraph.getNeighbors(1)).toEqual([2, 4]);
    expect(testGraph.getNeighbors(2)).toEqual([1, 4]);
    expect(testGraph.getNeighbors(3)).toEqual([]);
    expect(testGraph.getNeighbors(4)).toEqual([1, 2]);
  })

  // create
  test('#addVertex', () => {
    testGraph.add(5)
    expect(testGraph.getVertices()).toEqual([1, 2, 3, 4, 5])
  })

  test('#addEdge', () => {
    newEdge = [1, 3]
    testGraph.addEdge(newEdge[0], newEdge[1])
    expect(testGraph.getEdges()).toEqual(new Set([
      [1, 2],
      [1, 4],
      [2, 1],
      [2, 4],
      [4, 1],
      [4, 2],
      [1, 3],
      [3, 1],
    ]));
  })

  // read
  test('#getNeighbors', () => {
    expect(testGraph.getNeighbors(1)).toEqual([2, 4])
    expect(testGraph.getNeighbors(2)).toEqual([1, 4])
    expect(testGraph.getNeighbors(3)).toEqual([])
    expect(testGraph.getNeighbors(4)).toEqual([1, 2])
  })

  test.only('#getVertices', () => {
    expect(testGraph.getVertices()).toEqual([1, 2, 3, 4])
  })

  test('#getEdges', () => {
    expect(testGraph.getEdges()).toEqual(new Set([
      [ 1, 2 ],
      [ 1, 4 ],
      [ 2, 1 ],
      [ 2, 4 ],
      [ 4, 1 ],
      [ 4, 2 ]
    ]));
  })

  test('#findVertex', () => {
    expect(testGraph.findVertex(1)).toEqual(true)
    expect(testGraph.findVertex(5)).toEqual(false)
  })

  test('#findEdge', () => {
    expect(testGraph.findEdge(1, 2)).toEqual(true)
    expect(testGraph.findEdge(1, 4)).toEqual(true)
    expect(testGraph.findEdge(2, 4)).toEqual(true)
  })

  // update

  // destroy
  test('removeEdge', () => {
    testGraph.removeEdge(1, 2)
    expect(testGraph.getNeighbors(1)).toEqual([4]);
    expect(testGraph.getNeighbors(2)).toEqual([4]);
  })

  test('removeVertex', () => {
    testGraph.removeVertex(1)
    expect(testGraph.getVertices()).toEqual([2, 3, 4]);
    expect(testGraph.getEdges()).toEqual();
  })
})
