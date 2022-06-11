---
layout: post
title: linked list
date: '2022-05-23'
categories: DSA
note: 這邊要記得用 structure 的角度來了解為什麼 module 是這樣寫
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
| create (insert) | O(n) |
| read (access with id) | あなた |
| search (access with attributes) | かのじょ |
| destroy (delete) | かのじょ |

* create: O(1) to O(N)
  * inserting an element at the end of an array has $$O(1)$$
  * inserting an element at the beginning of an array has $$O(N)$$ because we need to shift all the elements
  * inserting at given index is at most $$O(N)$$ because it needs to shift all the elements behind it
* linear search has $$O(N)$$ because it needs to search the value from beginning
* search by index has $$O(1)$$ because we can return the value with index such that list[id]
* update is not an issue because it just changes the value of an found data

## How

### create a singly linked list

The example in dynamic language

```ruby

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
