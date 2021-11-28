---
layout: post
title: (DSA 0) Overview
date: '2021-11-25'
categories: DSA
note:
---

## Intro

1. Data Structure: store data in a specific logic
2. Algorithm: methods to achieve most important goal given specific data structure
3. Key structures:
   1. arrays
   2. stacks
   3. queues
   4. linked list
   5. trees
   6. graphs
   7. tries
   8. hash table

## Why

To solve problem in a more efficient way, making no more space to improve both the time complexity and space complexity.

## How

We can decompose all the programming logics into four actions:

1. create
2. read
3. update
4. delete

and the method to evaluate these actions' performance are time complexity and space complexity.

### pointer (skip)

We should understand pointer first.

### time complexity

We ignore the math definition of big o and use the definition of big o in industry. `Time complexity = O(n)` means it needs to traverse "at most" "n elements" to get things done; for example, given a singly linked list, if we want to "read" the "last" element of this list, we need to traverse all the nodes; as a result, the time complexity is O(n).

### space complexity

We also ignore the math definition of big o and use the definition of big o in industry. Space complexity means how many elements for this problem to be done at most; for example, given a singly linked list with n elements, if we want to "remove" a element of this list, given we have the address of this element, we need to find this element first and then change the pointer of the previous node to the next node. On the storage point, we need no more space to find the next node but need one more space to save the address of the next node and change the pointer of previous node to this address, meaning the space complexity = O(1).

## What

### arrays

Arrays are a list of data "serially positioned"; for example,

```golang
[1, 2, 3, 4]
```

There are indexes in the array, so that the computer can easily find the elements with indexes; for example, the index of the element, `1` is `0`.



### stacks

### queues

### linked list

### trees

### graphs

### tries

### hash table

## reference

[**The top data structures you should know for your next coding interview**](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
