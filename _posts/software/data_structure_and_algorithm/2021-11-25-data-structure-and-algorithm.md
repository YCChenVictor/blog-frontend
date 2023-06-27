---
layout: post
title:
date: '2021-11-25'
categories: DSA
note:
mathjax: true
mermaid: true
publish: true
---

## Introduction

TBC

## Why

To solve problem in a more efficient way, making no more space to improve both the time complexity and space complexity. For more information, please refer to [problem solving]({{site.baseurl}}/dsa/2023/03/08/solve-problem.html)

## How

We can decompose all the programming logics into four actions: create, read, update, delete. The time complexity of CRUD an element in specific data structure is as follow:

|  | Create | Read | Update | Delete |
| array list | O(1) - O(n) | O(1) | O(1) | O(1) - O(n) |
| linked list | O(1) | O(n) | O(n) | O(n) |
| stack | O(1) | O(1) | O(1) | O(1) |
| queue | O(1) | O(1) | O(n) | O(1) |
| trees |
| graph |

* index starts from 0: By using zero-based indexing, the calculation of the memory address of an element is simplified. The address of the first element in the array is simply the starting address of the array, with no offset required. The address of the second element is the starting address plus the size of one element, the address of the third element is the starting address plus the size of two elements, and so on. This simple arithmetic works nicely with the way memory is allocated and addresses are calculated.

### Array

It is a data structure in programming that stores a collection of elements. These elements are stored in contiguous memory locations, and each element can be accessed using an index or a subscript. Please refer to [array]({{site.baseurl}}/dsa/2022/05/22/array.html) for more information.

### Linkedlist

A linked list is a linear data structure where elements are stored in a sequence, and each element is linked to its next element using pointers or references. It consists of a series of nodes, where each node contains a data element and a reference to the next node in the sequence. For more information, please refer to [linkedlist]({{site.baseurl}}/dsa/2022/05/23/linkedlist.html).

### Stack

A stack is an abstract data type that represents a collection of elements in a particular order. It follows the Last-In-First-Out (LIFO) principle, where the last element added to the stack will be the first one to be removed. For more information, please refer to [stack]({{site.baseurl}}/dsa/2022/06/24/stack.html)

### queue

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, where the first element added to the queue is the first element to be removed. It is commonly used in computer science and everyday life for organizing tasks or processing requests in a sequential manner. For more information, please refer to [queue]({{site.baseurl}}/dsa/2022/06/24/queue.html)

### tree

A tree is a hierarchical data structure with nodes connected by edges, and a single root node at the top. It is used in computer science to represent data with a hierarchical structure, and various algorithms have been developed to manipulate and process tree structures efficiently. For more information, please refer to [tree]({{site.baseurl}}/dsa/2022/06/26/tree.html)

### graphs

A graph is a visual representation of data that shows the relationship between different variables. It consists of nodes or vertices connected by edges or links that illustrate the connections or interactions between them. For more information, please refer to [graph]({{site.baseurl}}/dsa/2023/03/19/graph.html)

### tries

A trie, also known as a prefix tree, is a data structure used to store and search for strings efficiently. It organizes strings by their common prefixes, allowing for fast retrieval and insertion operations. For more information, please refer to [tries]({{site.baseurl}}/dsa/2023/04/26/tries.html)

### hash table

A hash table is a data structure that provides fast access to values based on a key. It uses a hash function to map keys to indices in an array, allowing for constant-time access to values, making it an efficient choice for many types of applications. For more information, please refer to [hash table]({{site.baseurl}}/dsa/2023/04/23/hash-table.html).

### dynamic programming

Dynamic programming is often applied to problems with recursive sequences of sub-problems, such as graph shortest path and longest common subsequence, by solving each subproblem only once and efficiently addressing large-scale optimization problems. The concept involves breaking down optimization problems into smaller sub-problems, storing and reusing their solutions to avoid redundant computations. For more information, please refer to [dynamic programming]({{site.baseurl}}/dsa/2023/03/24/dynamic-programming.html)

### sorting

Sorting is a fundamental operation in computer science that involves arranging a collection of elements in a specific order. It plays a crucial role in various applications, such as searching, data analysis, and maintaining data integrity, by providing an organized and easily accessible representation of the data. For more information, please refer to [sorting]({{site.baseurl}}/dsa/2023/03/09/sorting.html).

## what

Try to give real world example

## TODO

* key concepts (according to cracking the coding interview)
  * bit Manipulation
  * memory (stack vs. heap)

## reference

cracking the coding interview

[**The top data structures you should know for your next coding interview**](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
