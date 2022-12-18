---
layout: post
title: overview (DSA)
date: '2021-11-25'
categories: DSA
note: 這邊要依照各種資料結構的 CRUD 計算複雜度，還有演算法也是，等到所有文章寫完再來寫 overview
---

## Introduction

Before we dive into the world, please understand the basic concepts in the mindset, basic-concept-related-to-DSA.md. The structure of this article is as follow:

* data Structure: store data in a specific logic
  * hash table, arraylist, string_builder, vector
  * linked list
  * tree, tries, graph
  * stack, queue
  * heap
* Algorithm: methods to achieve most important goal given specific data structure
  * breath-first search
  * depth-first search
  * binary search
  * merge sort
  * quick sort
* key concepts:
  * bit Manipulation
  * memory (stack vs. heap)
  * recursion
  * dynamic programming
  * big O about time and space complexity

## Why

To solve problem in a more efficient way, making no more space to improve both the time complexity and space complexity.

## How

We can decompose all the programming logics into four actions:

* create
* read
* update
* delete

and the method to evaluate these actions' performance are time complexity and space complexity.

| time complexity of | arraylist | ...|
| :---        |    :----:   |          ---: |
| create (insert) | O(n) | O(1) |
| read (access with id) | あなた        | あなたたち      |
| search (access with attributes) | かのじょ        | かのじょたち      |
| destroy (delete) | かのじょ        | かのじょたち      |

* create: O(1) to O(N)
  * inserting an element at the end of an array has $$O(1)$$
  * inserting an element at the beginning of an array has $$O(N)$$ because we need to shift all the elements
  * inserting at given index is at most $$O(N)$$ because it needs to shift all the elements behind it
* linear search has $$O(N)$$ because it needs to search the value from beginning
* search by index has $$O(1)$$ because we can return the value with index such that list[id]
* update is not an issue because it just changes the value of an found data

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

cracking the coding interview

[**The top data structures you should know for your next coding interview**](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
