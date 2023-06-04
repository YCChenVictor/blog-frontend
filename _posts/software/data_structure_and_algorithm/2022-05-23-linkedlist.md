---
layout: post
title:
date: '2022-05-23'
categories: DSA
note: just finish the cracking coding interview examples first
mathjax: true
mermaid: true
publish: true
---

## Introduction

This article describes the concepts related to linkedlist. Not like arraylist, the nodes in linkedlist are not serial, so we need to store pointers pointing the neighbor of each node in this linkedlist and use these pointers to traverse the nodes to find targeted node. There are two types: singly linked list and doubly linked list.

* singly linked list: pointer points the next node in each node
<div class="mermaid">
graph LR
  id1((A)) --> id2((B))
  id2((B)) --> id3((C))
  id3((C)) --> id4((...))
</div>
* doubly linked list: pointer points the next and previous nodes in each node
<div class="mermaid">
graph LR
  id1((A)) --> id2((B))
  id2((B)) --> id1((A))
  id2((B)) --> id3((C))
  id3((C)) --> id2((B))
  id3((C)) --> id4((...))
  id4((...)) --> id3((C))
</div>

## why

Linked lists can dynamically grow and shrink in size during program execution, whereas the size of an array is fixed at the time of creation. Additionally, inserting or deleting elements in a linked list is relatively efficient, whereas in an array these operations can be expensive if the array is large.

## How

### Singly Linked List

* coding example:
  ```javascript
  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    // index starts from 0
    // position starts from 1
  
    constructor() {
      this.head = null;
    }
  
    // Create
    prepand(value) {
      const newNode = new Node(value);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
    }
  
    append(value) {
      let tail
      const newNode = new Node(value);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        tail = this.traverseTo('last')
        tail.next = newNode;
      }
    }
  
    insert(position, value) {
      if (position === 1) {
        this.prepend(value);
      } else {
        const newNode = new Node(value);
        const leader = this.traverseTo(position - 1);
        const nextNode = leader.next;
  
        leader.next = newNode;
        newNode.next = nextNode;
      }
    }
      
    // Read
    traverseTo(index) {
      let currentNode = this.head;
      
      if (index === 'last') {
        index = Infinity
      }
  
      for (let i = 0; i < index; i++) {
        if (currentNode.next !== null) {
          currentNode = currentNode.next;
        } else {
          return currentNode
        }
      }
      return currentNode
    }
  
    printList() {
      const list = [];
      let currentNode = this.head;
  
      while (currentNode !== null) {
        list.push(currentNode.value);
        currentNode = currentNode.next;
      }
  
      return list;
    }
  
    // Update
    update(position, value) {
      const target = this.traverseTo(position - 1);
      target.value = value
    }
  
    // Delete    
    remove(position) {
      if (position === 1) {
        this.head = this.head.next;
      } else {
        const unwantedNode = this.traverseTo(position - 1);
        const leader = this.traverseTo(position - 2);
  
        leader.next = unwantedNode.next;
      }
    }
  }
  
  module.exports = LinkedList;
  ```
* Time complexity
  * Create an element on head (prepand): O(1)
    * There is no traverse in this operation, it will create a node and update the pointer, so time complexity is O(1)
  * Insert an element: O(n)
    * It will traverse n nodes to find the correct position, where n is the number of nodes linked before the target one and then insert a node.
  * Read an element: O(n)
    * It will traverse n nodes to find the correct position, where n is the number of nodes linked before the target one.
  * Update an element: O(n)
    * It will traverse n nodes to find the correct position, where n is the number of nodes linked before the target one and then update the node.
  * Delete an element: O(n)
    * It will traverse n nodes to find the target nodes, where n is the number of nodes linked before the target one and then do operations to remove the node.
* spec
  ```javascript
  const LinkedList = require('../examples/singly_linked_list.js');
  
  describe('LinkedList', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){
        testLinkedList.prepand(values[i]);
      }
    });
  
    // create
    test('#prepand', () => {
      testLinkedList.prepand(0);
      expect(testLinkedList.printList()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
    });
  
    test('#append', () => {
      testLinkedList.append(0);
      expect(testLinkedList.printList()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
    });
  
    test('#insert', () => {
      testLinkedList.insert(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 62, 1000, 888, 74, 1 ]);
    });
  
    // read
    test('#traverse', () => {
      expect(testLinkedList.traverseTo(2).value).toEqual(888);
    })
  
    test('#printList', () => {
      expect(testLinkedList.printList()).toEqual([33, 62, 888, 74, 1]);
    })
    
    // update
    test('#update', () => {
      testLinkedList.update(3, 4)
      expect(testLinkedList.printList()).toEqual([33, 62, 4, 74, 1]);
    })
    
    // destroy
    test('#remove', () => {
      testLinkedList.remove(3)
      expect(testLinkedList.printList()).toEqual([33, 62, 74, 1]);
    })
  });
  ```

### Doubly Linked List

* coding example:
  ```javascript
  class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }
    
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
    
    // create
    append(data) { // create a node on the tail
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
    
    prepend(data) { // create a node on the head
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      }
    }
    
    insert(position, data) { // create a node on particular position
      const newNode = new Node(data);
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else if (position > this.length) {
        this.append(data)
      } else {
        const nodeOnPosition = this.traverseToIndex(position - 1);
        newNode.next = nodeOnPosition;
        newNode.prev = nodeOnPosition.prev;
        newNode.prev.next = newNode;
      }
    }
    
    // read
    value() { // return the value of node in particular position
    }
  
    values() { // return values from head
      let current_node = this.head;
      const result = [];
      while (current_node !== null) {
        result.push(current_node.data);
        current_node = current_node.next;
      }
      return result
    }
  
    reverseValues() { // return values from tail
      let current_node = this.tail;
      const result = [];
      while (current_node !== null) {
        result.push(current_node.data);
        current_node = current_node.prev;
      }
      return result
    }
  
    // traverse
    traverseToIndex(index) {
      let currentNode = this.head;
  
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
  
      return currentNode;
    }
    
    // update
    update(position, value) { // update the value on particular position
    
    }
      
    // delete
    remove(position) { // remove the node on particular position
      if (this.head === null) {
        return;
      }
      if (this.head === this.tail && this.head.data === data) {
        this.head = null;
        this.tail = null;
        return;
      }
      if (this.head.data === data) {
        this.head = this.head.next;
        this.head.prev = null;
        return;
      }
      let current_node = this.head.next;
      while (current_node !== null && current_node.data !== data) {
        current_node = current_node.next;
      }
      if (current_node === null) {
        return;
      }
      if (current_node === this.tail) {
        this.tail = this.tail.prev;
        this.tail.next = null;
        return;
      }
      current_node.prev.next = current_node.next;
      current_node.next.prev = current_node.prev;
    }
  }
  
  module.exports = DoublyLinkedList
  ```
* why we need doubly?
  * Traversal in both directions
  * (?) Insertion and deletion at any position: In a singly linked list, if you want to insert a node between two nodes, you need to modify the pointers of the previous node to point to the new node, and the new node to point to the next node. With a doubly linked list, you can simply update the pointers of the neighboring nodes to insert a node in between them. Similarly, when deleting a node from a doubly linked list, you can easily update the pointers of the neighboring nodes to remove the node.
* Spec
  ```javascript
  const DoublyLinkedList = require('../examples/doubly_linked_list.js');

  describe('DoublyLinkedList', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new DoublyLinkedList();
      const values = [1, 74, 888, 62, 33];
      for(let i = 0; i < values.length; i++){ // 33 <- 62 <- 888 <- 74 <- 1
        testLinkedList.prepend(values[i]);
      }
    });
  
    test('#prepend', () => { // 0 <- 33 <- 62 <- 888 <- 74 <- 1
      testLinkedList.prepend(0);
      expect(testLinkedList.values()).toEqual([ 0, 33, 62, 888, 74, 1 ]);
      expect(testLinkedList.reverseValues()).toEqual([ 1, 74, 888, 62, 33, 0 ]);
    });
  
    test('#append', () => { // 33 <- 62 <- 888 <- 74 <- 1 <- 0
      testLinkedList.append(0);
      expect(testLinkedList.values()).toEqual([ 33, 62, 888, 74, 1, 0 ]);
      expect(testLinkedList.reverseValues()).toEqual([ 0, 1, 74, 888, 62, 33 ]);
    });
  
    test('#insert', () => { // 33 <- 1000 <- 62 <- 888 <- 74 <- 1
      testLinkedList.insert(2, 1000);
      expect(testLinkedList.values()).toEqual([ 33, 1000, 62, 888, 74, 1 ]);
    });
    
    test('#update', () => {
      testLinkedList.update(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
    })
  
    test('#delete', () => {
      testLinkedList.update(2, 1000);
      expect(testLinkedList.printList()).toEqual([ 33, 1000, 888, 74, 1 ]);
    })
  });
  ```

## What

When solving linkedlist problems, always think of recursive.

### runner technique

* Concept: two pointers iterates through a linkedlist at the same time.
* Detecting Cycles
  ```javascript
  function hasCycle(head) {
    let slow = head;
    let fast = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
  
      if (slow === fast) {
        return true;
      }
    }
  
    return false;
  }
  ```
* Finding the Middle Node
  ```javascript
  function findMiddle(head) {
    let slow = head;
    let fast = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
  
    return slow;
  }
  ```

### Remove Dups

* Problem: Write code to remove duplicates from an unsorted linked list
* Information:
  * Example: from [1, 4, 6, 3, 2, 7, 4, 8, 3] to [1, 4, 6, 3, 2, 7, 8]
  * You can remove any duplicate nodes you want as long as the result are all unique values
* Edge cases: Only one node in this linkedlist
* Brute force: compare each node with the rest linked nodes
* Best time complexity: Because we need to traverse all the nodes to read their values at least once, the time complexity will be at least O(n).
* Code example
  ```javascript
  function removeDup(linkedList) {
    set = new Set();
    let currentNode = linkedList.head
    let previousNode = null
  
    while (currentNode !== null) {
      if (!set.has(currentNode.value)) {
        set.add(currentNode.value)
      } else {
        previousNode.next = currentNode.next
      }
      previousNode = currentNode
      currentNode = currentNode.next
    }
  
    return linkedList.printList()
  }
  ```
* test
  ```javascript
  const { removeDup } = require('../examples/remove_dup.js');
  const LinkedList = require('../examples/singly_linked_list.js');
  
  describe('RemoveDup', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = removeDup(testLinkedList)
      expect(result).toEqual([1, 4, 6, 3, 2, 7, 8]);
    });
  });
  ```
* Temporary buffer not allowed (TBC)

### Return Kth to Last

* Problem: Implement an algorithm to find the kth to last element of a singly linked list.
* Information:
  * Example: If a linkedlist is 1 <- 4 <- 6 <- 3 <- 2 <- 7 <- 8, then returnKthToLast(linkedList, 3) will be 6 <- 3 <- 2 <- 7 <- 8
  * It should return a node because the node of a linkedlist will show all the following node values. 
* Code example:
  ```javascript
  function returnKthToLast (linkedList, k) {
    let counter = 1; // The first element is 1th
    let node = linkedList.head;
    while (node) {
      if (counter === k) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }
  
  module.exports = {
    returnKthToLast: returnKthToLast
  };
  ```
* Test:
  ```javascript
  const { removeDup } = require('../examples/remove_dup.js');
  const LinkedList = require('../examples/singly_linked_list.js');
  
  describe('RemoveDup', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = removeDup(testLinkedList)
      expect(result).toEqual([1, 4, 6, 3, 2, 7, 8]);
    });
  });
  ```

### Delete Middle Node

* Problem: Implement an algorithm to delete a node in the middle.
* Example:
  * a -> b -> c -> d -> e -> f => a -> b -> d -> e -> f
  * a -> b -> c -> d -> e => a -> b -> d -> e
* Edge Case:
  * If the linkedlist has only one node, then nothing will be removed from the list.
* Time complexity: We must need to traverse at least once to know the length, so the time complexity is at least O(n).
* Code example:
  ```javascript
  function deleteMiddleNode(linkedList) {
    let fast = linkedList.head;
    let slow = linkedList.head;

    if (fast.next === null) {
      return
    }

    while (fast) {
      fast = fast.next.next
      preNode = slow
      slow = slow.next
      if (fast.next === null) {
        preNode.next = slow.next
        return
      }
    }
    return linkedList;
  }
  ```
* Test:
  ```javascript
  let linkedList = new LinkedList();
  const values = [1, 2, 3, 5, 4, 449, 12];
  for(let i = 0; i < values.length; i++){
    linkedList.insertAtBegin(values[i]); // return 12 <- 449 <- 4 <- 3 <- 2 <- 1
  }
  
  let node = deleteMiddleNode(linkedList);
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
  ```

### Partition

(2023/06/03, TBC)

* Problem: Given a number, all nodes with value less than this number will be moved to left and all nodes with value larger than this number will be moved to right.
* Example: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 => 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
* Edge Case:
  * If there is only one node, then return linkedlist
* Time complexity: We need to traverse all nodes at least once to compare the values, so the time complexity is at least O(n).
* Code example:
  ```javascript
  function Partition(linkedlist, value) {
    let node = linkedlist.head
    let leftPartition = new LinkedList()
    let rightPartition = new LinkedList()

    while(node) {
      if node.value < value {
        leftPartition.prepand(node)
      } else {
        rightPartition.prepand(node)
      }
    }

    leftPartition.printList()
    rightPartition.printList()
  }
  ```
* Test:
  ```javascript
  const { Partition } = require('../examples/partition.js');
  const LinkedList = require('../examples/singly_linked_list.js');

  describe('Partition', () => {
    let testLinkedList;
    beforeEach(() => {
      testLinkedList = new LinkedList();
      const values = [1, 4, 6, 3, 2, 7, 4, 8, 3];
      for(let i = 0; i < values.length; i++){
        testLinkedList.append(values[i]);
      }
    });
  
    test('#', () => {
      const result = Partition(testLinkedList, 5)
      // 1, 4, 3, 2, 4, 3
      // 6, 7, 8
      expect(result.printList()).toEqual([1, 4, 3, 2, 4, 3, 6, 7, 8]);
    });
  });
  ```

### Sum List

### Palindrome

### Intersection

### Loop Detection

## What

Real-world problem that uses an linked list data structure and algorithm

* I want to parse the steps from a ChatGPT answer and store them as different Nodes in a linked list

```javascript
class Step {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addStep(data) {
    const newStep = new Step(data);

    if (!this.head) {
      this.head = newStep;
    } else {
      let currentStep = this.head;

      while (currentStep.next) {
        currentStep = currentStep.next;
      }

      currentStep.next = newStep;
    }
  }

  removeStep(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let currentStep = this.head;

    while (currentStep.next) {
      if (currentStep.next.data === data) {
        currentStep.next = currentStep.next.next;
        return;
      }

      currentStep = currentStep.next;
    }
  }
}
```

and use this structure

```javascript
const linkedList = new LinkedList();

async function handleQuestion(question) {
  const answer = await getChatGPTResponse(question);
  const steps = parseSteps(answer);

  steps.forEach(step => linkedList.addStep(step));
}

function parseSteps(answer) {
  const steps = answer.split('\n');
  return steps.map(step => step.trim()).filter(step => step !== '');
}
```

## reference

cracking the coding interview

[Practical Linked List in Ruby](https://www.rubyguides.com/2017/08/ruby-linked-list/)
[Linked Lists in JavaScript (ES6 code)](https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3)
[The Jest Object](https://jestjs.io/docs/getting-started)
