---
layout: post
title: linked list
date: '2022-05-23'
categories: DSA
note: 這邊要記得用 structure 的角度來了解為什麼 module 是這樣寫
---

## Introduction

This article describes the concept of linked list which represents a sequence of nodes. Not like array, the nodes are not serial, so we need to store pointer pointing the neighbor of this linked list. There two type: singly linked list and doubly linked list.

* singly linked list: pointer points the next node in each node
* doubly linked list: pointers point the next and previous nodes in each node

## why

Given a memory disk with multiple data preserved and we cannot insert a serial data in it, we may use linked list to achieve it because the nodes can be unserial. It saves memory but costs more time to search.

## How

### structure

Given three nodes,
node1: {data: 1, pointer: b, address: a}
node2: {data: 2, pointer: c, address: b}
node3: {data: 3, pointer: null, address: c}

```bash
node1-> node2 -> node3 -> NULL
```

every node has a stored data and a pointer pointing the address of the next node. The addresses are the memory location of these nodes.

Normally, we can only access the first node of the linked list and with the pointers in these nodes, we can traverse to get the node we want.

### create a singly linked list

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

[**Linked List: Intro(簡介)**](http://alrightchiu.github.io/SecondRound/linked-list-introjian-jie.html)
