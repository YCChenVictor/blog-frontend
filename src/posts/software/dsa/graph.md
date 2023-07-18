# title

## Introduction

TBC

## Why?

Graphs are valuable tools for visually representing the relationships and connections among data points, enabling us to easily discern patterns and gain insightful observations.

## How?

### Basic Concept

Graph with undirected graph

<div class="mermaid">
  flowchart TD
    id0((0)) --- id1((1))
    id3((3)) --- id1((1))
    id3((3)) --- id2((2))
    id0((0)) --- id3((3))
    id2((2)) --- id0((0))
    id1((1)) --- id1((1))
</div>

* Vertices (Represent the objects or entities being modeled)
  * Based on the nodes in the flowchart, the vertices can be represented by the numbers 0, 1, 2, and 3.
* Edges (Represent the relationships or connections between those objects)
  * Based on the connections between the nodes in the flowchart, the edges can be considered as directed edges connecting the vertices.
* Representation
  * Adjacency matrices and adjacency lists are commonly used to represent graphs. Edge lists can also be used, although they are less common for dense graphs.
  * Adjacency matrices (undirected edges)
    ```bash
       | 0 | 1 | 2 | 3 |
    ---------------------
    0  | 0 | 1 | 1 | 1 |
    1  | 1 | 1 | 0 | 1 |
    2  | 1 | 0 | 0 | 1 |
    3  | 1 | 1 | 1 | 0 |
    ```
    * The value 1 represents the presence of an edge between two vertices. If the edge is undirected, there will be 1 in both intersected cells. (2023/07/04)
  * Adjacency lists (What I prefer, refer to [here](https://medium.com/basecs/from-theory-to-practice-representing-graphs-cfd782c5be38))
    ```bash
    0: [1, 3]
    1: [1]
    2: [0]
    3: [1, 2]
    ```
    * Each vertex is associated with a list of vertices it is connected to.
    * For example, vertex 0 is connected to vertices 1 and 3.
  * Edge lists
    ```
    [(0, 1), (0, 3), (1, 1), (2, 0), (3, 1), (3, 2)]
    ```
    * Each tuple represents an edge between two vertices.
    * For example, there is an edge from vertex 0 to vertex 1, from vertex 0 to vertex 3, and so on.
* Other
  * Self loop: the edge from a vertex to itself

### Basic Form

Here will compose a class of adjacency lists 

* Basic structure (based on visualization)
  ```javascript
  const graph = { // adjacency lists
    0: [1, 2],
    1: [0, 1, 3],
    2: [0, 3],
    3: [0, 1, 2]
  };
  ```
* Code example
  ```javascript
  class Graph {
    // Adjacency list form
    // Undirected edges
    // No attributes on edges and nodes
    constructor() {
      this.adjacencyList = {};
    }

    // create
    addVertex(vertex) {
      this.adjacencyList[vertex] = [];
    }
  
    addEdge(vertex1, vertex2) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }

    // read
    getNeighbors(vertex) {
      return this.adjacencyList[vertex];
    }

    getVertices() {
      return Object.keys(this.adjacencyList);
    }

    getEdges() {
      const edges = new Set() // use set
      for (let [vertexOne, vertexTwos] of Object.entries(this.adjacencyList)) {
        vertexTwos.forEach((vertexTwo) => {edges.add([parseInt(vertexOne), vertexTwo])})
      }
      return edges
    }

    findVertex(vertex) {
      return this.vertices.has(vertex)
    }

    findEdge(vertex1, vertex2) {
      return this.vertices.get(vertex1).has(vertex2) && this.vertices.get(vertex2).has(vertex1)
    }

    // update
    // There will be no update methods for vertex and edge because in this class there is no attributes for both of them.
  
    // destroy
    removeEdge(vertex1, vertex2) {
      let index2 = this.adjacencyList[vertex1].indexOf(vertex2)
      let index1 = this.adjacencyList[vertex2].indexOf(vertex1)
      if (index2 > -1) {
        this.adjacencyList[vertex1].splice(index2, 1)
      }
      if (index1 > -1) {
        this.adjacencyList[vertex2].splice(index1, 1)
      }
    }

    removeVertex(vertex) {
      while (this.adjacencyList[vertex].length) {
        neighborVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, neighborVertex)
      }
    }
  }

  module.exports = Graph;
  ```
* spec
  ```javascript
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
  ```
* Time complexity
  * Adding a vertex: O(1) (constant time)
  * Adding an edge: O(1) (constant time)
  * Removing a vertex: O(V + E) (linear time, where V is the number of vertices and E is the number of edges)
  * Removing an edge: O(1) (constant time)
  * Finding a vertex: O(V) (linear time)
  * Finding an edge: O(E) (linear time)

### Traversal Algorithm

I am going to use following graph to build traversal algorithms

<div class="mermaid">
flowchart LR
    a((A)) --- b((B))
    a((A)) --- c((C))
    b((B)) --- d((D))
    b((B)) --- e((E))
    c((C)) --- f((F))
    e((E)) --- f((F))
    g((G))
</div>

#### DFS (depth first search)

* Application
  * Find paths between two vertices
  * Detect cycles in a graph
  * Determine whether a graph is bipartite
* Solution:
  1. Choose a starting vertex in the graph.
  2. Visit the starting vertex and mark it as visited.
  3. Choose an unvisited neighbor of the current vertex.
  4. Move to the chosen neighbor and repeat steps 2 and 3 recursively.
  5. If there are no unvisited neighbors, backtrack to the previous vertex and choose the next unvisited neighbor (if any).
  6. Repeat steps 2-5 until all vertices have been visited or the desired condition is met.
* Example:
  * A -> B -> D -- backtrack to B -> E -> F -> C -> G, so the result will be [A, B, D, E, F, C, G]
  * Intuition: Have a look at this [video](https://www.youtube.com/watch?v=7fujbpJ0LB4)
* Time complexity: O(V + E)
* Code Example:
  ```javascript
  class GraphTraversal extends Graph {
    depthFirstSearch(vertex, visited = new Set()) {
      visited.add(vertex);
      this.getNeighbors(vertex).forEach(neighbor => {
        if(!visited.has(neighbor)) {
          this.depthFirstSearch(neighbor, visited)
        }
      })
      return visited
    }
    ...
  }

  module.exports = GraphTraversal;
  ```
* Spec:
  ```javascript
  const Graph = require('../examples/graph.js');
  
  describe('Graph', () => {
    beforeEach(() => {
      let testGraph = new Graph();
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(node => testGraph.addVertex(node));
      [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
    })
  
    test('DFS', () => {
      expect(testGraph.depthFirstSearch('A')).toEqual(['A', 'B', 'D', 'E', 'F', 'C', 'G']);
    })
    ...
  })
  ```

#### BFS (breath first search)
  
* Application:
  * Find the shortest path between two nodes in an unweighted graph
  * Find all the nodes that are at a certain distance from a given node
  * Check for the existence of a path between two nodes in a graph
* Solution:
  1. Choose a starting vertex in the graph.
  2. Enqueue the starting vertex into a queue and mark it as visited.
  3. While the queue is not empty, perform the following steps:
    a. Dequeue a vertex from the front of the queue.
    b. Visit the dequeued vertex.
  4. For each unvisited neighbor of the visited vertex, do the following:
    a. Enqueue the neighbor into the queue.
    b. Mark the neighbor as visited.
  5. Repeat steps 3 and 4 until the queue becomes empty.
* Example:
  * Start ---- queue: [A] ----> A ---- Enqueue B and C (queue: [B, C]) ----> B ---- Enqueue D and E (queue: [C, D, E]) ----> C ---- Enqueue F (queue: [D, E, F]) ----> D -> E -> F -> G, so the result will be [A, B, C, D, E, F, G]
  * Intuition: Have a look at this [video](https://www.youtube.com/watch?v=oDqjPvD54Ss&t=85s)
* Time complexity: O(V + E)
  * Given the result in example section, we can see that it will enqueue all nodes to visited array once and enqueue all nodes with edges to other nodes and not visited once, making the complexity to be V + E
* code example
  ```javascript
  class GraphTraversal extends Graph {
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

    ...
  }

  module.exports = GraphTraversal;
  ```
* spec
  ```javascript
  const Graph = require('../examples/graph.js');
  
  describe('Graph', () => {
    beforeEach(() => {
      let testGraph = new Graph();
      ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(node => testGraph.addVertex(node));
      [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']].forEach(edge => testGraph.addEdge(edge[0], edge[1]))
    })
  
    ...
  
    test('BFS', () => {
      expect(testGraph.breadthFirstSearch('A')).toEqual(new Set(['A', 'B', 'C', 'D', 'E', 'F']));
    })
  })
  ```

#### DFS vs BFS

* Memory efficiency: DFS > BFS because DFS do not need to another queue to store nodes going to visit.
* Detecting cycles: DFS > BFS because DFS will go deeper first, which if there is cycle in a graph, it will return to a visited node on a route first, compared to BFS.
* Find shortest path: DFS < BFS because BFS does level-by-level exploration. When we find a target nodes, we can stop the exploration and return the path from a node to target node.

### Route Between Nodes

TBC

### Build Order

TBC

### Dijkstra's algorithm

TBC

## What?

### Maze

* Try to find the shortest path in maze with DFS
* Represent maze as a graph, each cell is a node and the neighboring cells are connected by edges
* Use a depth-first search algorithm to explore all possible paths from the starting cell to the exit cell. We can mark each cell as visited as we explore the maze and keep track of the shortest path we've found so far. Once we reach the exit cell, we compare the length of the path we've found to the shortest path so far and update it if the new path is shorter.
* This approach can be optimized using techniques such as backtracking and memoization to avoid exploring paths that cannot lead to the shortest path.
* Code example:

## TODO

* Algorithms
  * shortest path algorithms
    * Dijkstra's algorithm
    * Bellman-Ford algorithm
  * minimum spanning tree algorithms
    * Prim's algorithm
    * Kruskal's algorithm
* Graph traversal
  * shortest path between two nodes
  * detecting cycles in a graph

## Reference

[Graph Data Structure in Javascript](https://www.tutorialspoint.com/Graph-Data-Structure-in-Javascript#:~:text=A%20graph%20is%20a%20pictorial,the%20vertices%20are%20called%20edges.)

[10 Graph Algorithms Visually Explained](https://towardsdatascience.com/10-graph-algorithms-visually-explained-e57faa1336f3)