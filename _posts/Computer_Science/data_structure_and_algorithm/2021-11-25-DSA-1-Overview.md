---
layout: post
title: (DSA) Overview
date: '2021-11-25'
categories: DSA
note:
---

## Introduction

Before we dive into the world, please understand the basic concepts in the mindset, 2022-05-02-complexity.md

* Data Structure: store data in a specific logic
* Algorithm: methods to achieve most important goal given specific data structure
* Key structures: array, stack, queue, linked list, tree, graph, tries, hash table

## Why

To solve problem in a more efficient way, making no more space to improve both the time complexity and space complexity.

## How

We can decompose all the programming logics into four actions:

* create
* read
* update
* delete

and the method to evaluate these actions' performance are time complexity and space complexity.

### pointer (skip)

We should understand pointer first.

## What

### arrays

Arrays are a list of data "serially positioned"; for example,

```golang
[1, 2, 3, 4]
```

There are indexes in the array, so that the computer can easily find the elements with indexes; for example, the index of the element, `1` is `0`.

#### create in array

1. time complexity = O(1)
Because of the indexing, we can easily insert the element to the specific position we want, so the time complexity is O(1).

2. space complexity = O(n)
The space complexity is O(n) at most; for example, if we append element at the beginning of the array, we need to shift all elements at once.

#### read in array

1. time complexity = O(1)
Because of indexing, we can find the element in an array without traversing any element, so the time complexity is O(1).

2. no space complexity issue
Because we won't move any address of the elements in array, there is no space complexity issue.

#### Update in array

skip

#### delete in array

skip

### stacks

#### create in stack

The rule of stack is LIFO (last in first out). Given a stack,

```golang
[1, 2, 3, 4]
```

1. time complexity

2. space complexity
#### read in stack

#### update in stack

#### delete in stack

### queues

### linked list

### trees

### graphs

### tries

### hash table

## reference

[**The top data structures you should know for your next coding interview**](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
