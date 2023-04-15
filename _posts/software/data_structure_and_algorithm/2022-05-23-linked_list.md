---
layout: post
title: linkedlist
date: '2022-05-23'
categories: DSA
note:
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

### singly linked list in javascript

* coding example:

```javascript
// Define a Node class for the elements of the linked list
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// Define the LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add a new element to the end of the list
  prepand(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
  }

  // Get an element at a specified index
  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  // Remove an element at a specified index
  remove(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      let previous = null;
      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
      if (index === this.length - 1) {
        this.tail = previous;
      }
    }
    this.length--;
    return current.data;
  }
}

// Example usage
const list = new LinkedList();
list.add('a');
list.add('b');
list.add('c');
console.log(list.get(1)); // Output: "b"
list.remove(1);
console.log(list.get(1)); // Output: "c"
```

* create an element: O(1)
  * adding a new element to a LinkedList involves creating a new node and updating the head pointer to point to the new node, which can be done in constant time
* read an element: O(n)
  * In singly-linked list, the time complexity of read is O(n) in the worst case, where n is the length of the list Unlike an array, where elements are stored contiguously in memory and can be accessed in constant time using an index, in a linked list, we have to traverse the list from the head node to the desired index, which takes linear time proportional to the size of the list.
* update an element: O(n)
  * In a singly-linked list, the time complexity of update (i.e., modifying an element by index) is also O(n) in the worst case, where n is the length of the list. This is because like accessing an element, we need to traverse the list from the head node to the desired index to update it. Once we have reached the node, updating it takes constant time, i.e., O(1).
* delete an element: O(n)
  * In a singly-linked list, the time complexity of delete (i.e., removing an element by index) is also O(n) in the worst case, where n is the length of the list. This is because we need to traverse the list from the head node to the node immediately before the one we want to delete, which takes linear time proportional to the size of the list. Once we have found the node before the one we want to delete, we can remove the target node in constant time, i.e., O(1), by updating its predecessor's next pointer to skip over the target node.

* spec

```javascript
import {LinkedList} from '../singly_linked_list.js';

describe('LinkedList', () => {
  let testLinkedList;
  beforeEach(() => {
    testLinkedList = new LinkedList();
    const values = [1, 74, 888, 62, 33];
    for(let i = 0; i < values.length; i++){
      testLinkedList.append(values[i]);
    }
  });

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
  // more test to be continued
});
```

### create a doubly linked list

to be continued

## What

When solving linklist porblems, always think of recursive.

### runner technique

two pointers iterates through a linkedlist at the same time.

### Remove Dups

* problem: Write code to remove duplicates from an unsorted linked list; for example, a linkedlist = [1, 4, 6, 3, 2, 7, 4, 8, 3] -> [1, 4, 6, 3, 2, 7, 8]

* brute force:

It's trivial, so I just skip to the result

* code example:

```javascript
function removeDup(linkedList) {
  // skip brute force, we must at least loop through all node, so the time complexity = O(n), space complexity = O(n)
  set = new Set();
  let currentNode = linkedList.head
  let previousNode = null

  for (let i = 0; i < linkedList.length; i++) {
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

#### temporary buffer not allowed

to be continued

### Return Kth to Last

Implementation:

```javascript
function returnKthToLast (linkedList, k) {
  let counter = 0;
  let node = this.head;
  while (node) {
    if (counter === k) {
      return node;
    }
    counter++;
    node = node.next;
  }
  return null;
}
```

Test:

```javascript
let linkedList = new LinkedList();
const values = [1, 2, 3, 4, 449, 12];
for(let i = 0; i < values.length; i++){
  linkedList.insertAtBegin(values[i]);
}

let node = returnKthToLast(linkedList, 0); // 12, 449, 4, 3, 2, 1
let node = returnKthToLast(linkedList, 1); // 449, 4, 3, 2, 1
let node = returnKthToLast(linkedList, 2); // 4, 3, 2, 1
while (node !== null) {
  console.log(node.value);
  node = node.next;
}
```

### Delete Middle Node

Implementation:

```javascript
function deleteMiddleNode (linkedList) {
  let nodeFaster = linkedList.head;
  let nodeSlower = linkedList.head;
  let preNode = null;
  while (nodeFaster) {
    if (!nodeFaster.next?.next || !nodeFaster.next) {
      preNode.next = preNode.next.next;
      return linkedList.head
    }
    preNode = nodeSlower;
    nodeSlower = nodeSlower.next;
    nodeFaster = nodeFaster.next.next;
  }
  return null;
}
```

Test:

```javascript
let linkedList = new LinkedList();
// const values = [1, 2, 3, 4, 449, 12]; // return 12, 449, 3, 2, 1
const values = [1, 2, 3, 5, 4, 449, 12]; // return 12, 449, 4, 3, 2, 1
for(let i = 0; i < values.length; i++){
  linkedList.insertAtBegin(values[i]);
}

let node = deleteMiddleNode(linkedList);
while (node !== null) {
  console.log(node.value);
  node = node.next;
}
```

To be continued (more questions)

## What

Try to demo it with real world examples

## reference

cracking the coding interview

[Practical Linked List in Ruby](https://www.rubyguides.com/2017/08/ruby-linked-list/)
[Linked Lists in JavaScript (ES6 code)](https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3)
[The Jest Object](https://jestjs.io/docs/getting-started)
