---
layout: post
title: linked list
date: '2022-05-23'
categories: DSA
note: 這邊要記得用 structure 的角度來了解為什麼 module 是這樣寫
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

#### The example in dynamic language

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
class LinkedList{
  constructor(){
    this.head = null;
  }

  insertAtBegin(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    return this.head;
  }

  insertAtEnd(value) {
    let newNode = Node(value);
    let nextNode = this.head.next;
    if(!this.head){
      insertAtBegin(value)
    }
    tail = findTail()
    tail.next = newNode;
    return this.head
  }

  find() {

  }

  findTail() {
    let node = this.head;
    while(node.next !== null) {
      node = node.next
    }
    return node
  }

  findBefore() {

  }

  findAfter() {
    
  }

  print() {
    let node = this.head;
    while(node !== null) {
      console.log(node.value);
      node = node.next
    }
  }
}
```

* A nodes has the stored value and a pointer to next node
* 

```javascript
// input class, Node
// input class, LinkedList
testLinkedList = new LinkedList();
values = [1, 74, 888, 62, 33];
// 33 -> 62 -> 888 -> 74 -> 1 -> null (insertAtBegin)
// 1 -> 74 -> 888 -> 62 -> 33 -> null (insertAtEnd)
for(let i = 0; i < values.length; i++){
  testLinkedList.insertAtBegin(values[i]);
}
testLinkedList.print()
```

### create a doubly linked list

## What

Given the concept above, I am going to construct it with golang.

```go
// a node in linked list
type Node struct {
    value int
    next  *Node
}

// linked list
type LinkedList struct {
    head *Node
    len  int
}

// add a node


// remove a node

// display the linked list
```

## reference

cracking the coding interview

[Practical Linked List in Ruby](https://www.rubyguides.com/2017/08/ruby-linked-list/)
