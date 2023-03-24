class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex) {
    this.vertices.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    this.vertices.get(vertex1).push(vertex2);
    this.vertices.get(vertex2).push(vertex1);
  }

  getNeighbors(vertex) {
    return this.vertices.get(vertex);
  }

  depthFirstSearch(vertex, visited = new Set()) {
    visited.add(vertex);
    this.getNeighbors(vertex).forEach(neighbor => {
      if(!visited.has(neighbor)) {
        this.depthFirstSearch(neighbor, visited)
      }
    })
    return visited
  }
  
  breadthFirstSearch(startingVertex) {
    const queue = [startingVertex];
    const visited = new Set([startingVertex]);

    while (queue.length) {
      const currentVertex = queue.shift();
      const neighbors = this.getNeighbors(currentVertex);
  
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return visited;
  }
}

module.exports = Graph;
