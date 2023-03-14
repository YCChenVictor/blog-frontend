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

Given a memory disk with multiple data preserved and we cannot insert a serial data in it, we may use linked list to achieve it because the nodes can be unserial.

## How

### singly linked list in javascript

* code example

```javascript
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Create
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
      tail.tail = newNode;
    }
    
    this.length++;
  }
    
  // Read
  traverseToIndex(index) {
    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
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
  insert(index, value) {
    if (index === 0) {
      this.prepend(value);
    } else if (index >= this.length) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const leader = this.traverseToIndex(index - 1);
      const nextNode = leader.next;

      leader.next = newNode;
      newNode.next = nextNode;
      this.length++;
    }
  }

  // Delete    
  remove(index) {
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
    } else {
      const leader = this.traverseToIndex(index - 1);
      const unwantedNode = leader.next;

      leader.next = unwantedNode.next;
      this.length--;
    }
  }
}

export {LinkedList};
```

* index of linkedlist starts from 0

With Jest, we can write unit tests:

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
