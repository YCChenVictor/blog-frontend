---
layout: post
title: (DSA x) singly_linked_list
date: '2021-11-24'
categories: DSA
note: 這邊要記得用 structure 的角度來了解為什麼 module 是這樣寫
---

## Introduction

skip

## Why

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

Normally, we can only access the first node of the linked list and with the pointers in these node, we can traverse in these nodes.

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
