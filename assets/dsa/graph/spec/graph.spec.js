describe('Graph', () => {
  let testGraph;
  const vertices = [1, 2, 3, 4];
  const edges = [
    [1, 2],
    [1, 4],
    [2, 4],
  ]
  beforeEach(() => {
    testGraph = new Graph();
    
  })

  describe('#init', () => {
    expect(getNeighbors(1)).toEqual(2, 4)
    expect(getNeighbors(2)).toEqual(1, 4)
    expect(getNeighbors(3)).toEqual(null)
    expect(getNeighbors(4)).toEqual(1, 2)
  })
})
