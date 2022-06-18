---
layout: post
title: linked list
date: '2022-05-23'
categories: DSA
note: 接下來要測試 delete，各種 delete，寫完測試，要實際做題目，至少課本裡的前幾題要做
mathjax: true
mermaid: true
publish: 
---

## Introduction

This article describes the concepts related to linked list which represents a sequence of nodes. Not like array, the nodes are not serial, so we need to store pointers pointing the neighbor of each node in this linked list and use these pointers to traverse the nodes to find targeted node. There are two types: singly linked list and doubly linked list.

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

Given a memory disk with multiple data preserved and we cannot insert a serial data in it, we may use linked list to achieve it because the nodes can be unserial; it saves memory but costs more time to search and also linklist sometimes is faster than arraylist.

### Time complexity of linkedlist

| :--- | :---- |
| create (insert) | O(1) |
| read (access with id) | O(N) |
| search (access with attributes) | O(N) |
| destroy (delete) | O(1) |

* create: given we finish the search, we just need to change the pointer values to point to the new element, so inserting an element takes $$O(1)$$
* read: even though we have the id for specific element, we still need to traverse all the nodes so the complexity of read is at most $$O(N)$$
* search: the complexity of search is at most $$O(N)$$ because we need to start from the begining everytime for one element
* destroy: after we found the element we want to delete, we just need to change the pointers before it to point to the next element, so it takes $$O(1)$$
* update:

## How

### create a singly linked list

#### The example in dynamic (singly linked list)

A node:

```javascript
class Node {
  constructor(value, next = null) {
    this.value = value,
    this.next = next
  }
}
```

A linkedlist:

```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertAtBegin(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    return this.head;
  }
  
  insertAtEnd(value) {
    let newNode = new Node(value);
    let tail;
    if (!this.head) {
      this.insertAtBegin(value)
    } else {
      tail = this.findTail();
      tail.next = newNode;
    }
    return this.head
  }
  
  insertAt(value, index) {
    const preNode = this.find(index - 1);
    const newNode = new Node(value);
    if (!this.head || index === 0) {
      this.insertAtBegin(value)
    } else {
      newNode.next = preNode.next;
      preNode.next = newNode;
    }
  }
  
  deleteAtBegin() {
    if (!this.head) {
      return
    }
    this.head = this.head.next;
    return this.head;
  }
  
  deleteAtEnd() {
    let beforeTail = this.head;
    let tail = this.head.next;
    if (!this.head || !this.head.next) {
      this.head = null;
      return this.head;
    }
    while(tail.next !== null) {
      beforeTail = tail;
      tail = tail.next;
    }
    beforeTail.next = null;
    return this.head;
  }
  
  deleteAt(index) {
    const preNode = this.find(index - 1);
    if (!this.head) {
      return this.head;
    } else if (index === 0) {
      this.head = this.head.next;
      return this.head;
    } else {
      if (!preNode || !preNode.next) {
        return;
      }
      preNode.next = preNode.next.next;     
      return this.head
    }
  }
  
  find(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }
  
  findTail() {
    let node = this.head;
    while (node.next !== null) {
      node = node.next
    }
    return node
  }
  
  values() {
    let node = this.head;
    let result = [];
    while (node !== null) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }

  print() {
    let node = this.head;
    while (node !== null) {
      console.log(node.value);
      node = node.next;
    }
  }
}
```

* A nodes has the stored value and a pointer to next node
* index starts from 0

With Jest, we can write unit tests:

```javascript
import {LinkedList} from '../singly_linked_list.js';

test('LinkedList', () => {
  let testLinkedList = new LinkedList();
  const values = [1, 74, 888, 62, 33];
  for(let i = 0; i < values.length; i++){
    testLinkedList.insertAtBegin(values[i]);
  }
  // initialize
  expect(testLinkedList.values()).toEqual([ 33, 62, 888, 74, 1 ]);
  // create at end
  // create at begin
  // insert at given index
  // read
  // update at given index
  // delete at end
  // delete at begin
  // delete at given index
}); 
```

#### The example in static (singly linked list)

to be continued

### create a doubly linked list

## What

the questions

## reference

cracking the coding interview

[Practical Linked List in Ruby](https://www.rubyguides.com/2017/08/ruby-linked-list/)
[Linked Lists in JavaScript (ES6 code)](https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3)
[The Jest Object](https://jestjs.io/docs/getting-started)
