# Title

## Abstract

TBC

## Purpose

Heaps are necessary because they provide an efficient way to manage **priority-based** operations, such as retrieving the minimum or maximum element, which is valuable in various applications like scheduling, graph algorithms, and priority queues.

## Concept

Although heap is a complete binary tree, we usually use array to construct heap because of efficient memory usage, sequential access, cache efficiency, simplicity of indexing, and improved space efficiency.

### Min Heap

* Definition: A min heap is a complete binary tree where the value of each node is smaller than or equal to the values of its child nodes, with the minimum value located at the root node.
* Visualization
  ```mermaid
  graph TD
    B((10)) --> C((15))
    B((10)) --> D((20))
    C((15)) --> E((18))
    C((15)) --> F((17))
    D((20)) --> G((25))
    D((20)) --> H((30))
  ```
* Code example
  ```javascript
  class Heap {
    constructor() {
      this.values = [];
    }
  
    // create
    insert(value) {
      this.heap.append(value)
      heapify()
    }

    // read
    findMin() {
      return this.heap[0]
    }

    // update
    update(value, index) {
      this.heap[index] = value
      heapify()
    }
  
    // destroy
    delete() {
      // It will delete the minimum value
      this.heap.shift()
      heapify()
    }
  
    heapify() {
      // After each create, update, destroy, we will do heapify
      this.heap
    }
  }
  
  ```
* Spec
  ```javascript
  describe('Min Heap', () => {
    let heap = new MaxHeap([5, 7, 10, 20, 9, 15])
    
    test('insert', () => {
      heap.insert(3)
      expect(heap.values).toEqual([3, 5, 10, 20, 7, 15, 9])
    })

    test('findMin', () => {
      expect(heap.findMin()).toEqual(5)
    })

    test('update', () => {
      heap.update(3, 2)
      // [5, 7, 10, 20, 9, 15]
      // [5, 3, 10, 20, 9, 15]
      // [3, 5, 10, 20, 9, 15]
      expect(heap.values).toEqual([3, 5, 10, 20, 9, 15])
    })

    test('delete', () => {
      heap.delete()
      expect(heap.values).toEqual([7, 10, 20, 9, 15])
    })

    test('heapify', () => {
      let randomHeap = newMax([10, 20, 5, 15, 9, 7])
      randomHeap.heapify()
      expect(randomHeap.values).toEqual([5, 7, 10, 20, 9, 15])
    })
  })
  ```

### Max Heap

* Definition: A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its child nodes, with the maximum value located at the root node.
* Visualization
  ```mermaid
  graph TD
    B((20)) --> C((18))
    B((20)) --> D((15))
    C((18)) --> E((10))
    C((18)) --> F((12))
    D((15)) --> G((8))
    D((15)) --> H((7))
    E((10)) --> I((5))
    E((10)) --> J((6))
  ```
* Code example
  ```javascript
  class MaxHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(value) {
      //
    }
  
    delete() {
      // 
    }
  
    heapify() {
      // ... heapify implementation
    }
  
    // ... other heap-related methods
  }
  ```
* Spec
  ```javascript
  describe('Max Heap', () => {
    let heap = new MaxHeap([5, 7, 10, 20, 9, 15])
    
    test('insert', () => {
      heap.insert(3)
      expect(heap.values).toEqual([3, 5, 10, 20, 7, 15, 9])
    })

    test('findMin', () => {
      expect(heap.findMin()).toEqual(5)
    })

    test('update', () => {
      heap.update(3, 2)
      // [5, 7, 10, 20, 9, 15]
      // [5, 3, 10, 20, 9, 15]
      // [3, 5, 10, 20, 9, 15]
      expect(heap.values).toEqual([3, 5, 10, 20, 9, 15])
    })

    test('delete', () => {
      heap.delete()
      expect(heap.values).toEqual([7, 10, 20, 9, 15])
    })

    test('heapify', () => {
      let randomHeap = newMax([10, 20, 5, 15, 9, 7])
      randomHeap.heapify()
      expect(randomHeap.values).toEqual([5, 7, 10, 20, 9, 15])
    })
  })
  ```

## Example

## Reference

[Heaps in 3 minutes — Intro](https://www.youtube.com/watch?v=0wPlzMU-k00)
