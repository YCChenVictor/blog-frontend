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

Before we dive into it, please understand concept of [complexity]({{site.baseurl}}/dsa/2022/05/02/complexity.html). Data structures describe how data can be organized, stored, and manipulated. Algorithms are procedures for solving problems such as searching for information, sorting data, processing graphs, performing calculations, and many other tasks.

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

### Array

It is a data structure in programming that stores a collection of elements. These elements are stored in contiguous memory locations, and each element can be accessed using an index or a subscript. Please refer to [array]({{site.baseurl}}/dsa/2022/05/22/array.html) for more information.

### Linkedlist

[Linkedlist]({{site.baseurl}}/dsa/2022/05/23/linked_list.html)

### Stack

[stack]({{site.baseurl}}/dsa/2022/06/24/stack.html)

### queue

[queue]({{site.baseurl}}/dsa/2022/06/24/queue.html)

### tree

[tree]({{site.baseurl}}/dsa/2022/06/26/tree.html)

### graphs

[graph]({{site.baseurl}}/dsa/2023/03/19/graph.html)

### tries

to be continued (extract)

### hash table

to be continued (extract)

The data flow:

<div class="mermaid">
graph LR
  id1(value 1) --> id4(hash<br>function)
  id2(value 2) --> id4(hash<br>function)
  id3(value 3) --> id4(hash<br>function)

  id4(hash<br>function) -- insert value 1 --> id5(key 0)
  id4(hash<br>function) -- insert value 2 --> id7(key 1)
  id4(hash<br>function) -- insert value 3 --> id7(key 2)
  subgraph Buckets
    id5(key 0)
    id6(key 1)
    id7(key 2)
    id8(key 3)
    ...
  end

  id5(key 0) --> id9(value 1)
  id7(key 2) --> id10(value 2)
  id10(value 2) --> id11(value 3)
</div>

The value will be calculated by certain method in hash function to get the key of buckets and then connects the value with linked list if the mapping key is the same.

Given the length of buckets is N, meaning there are N keys, if we want to search an element, it will first pass the element into hash function to get the key for certain linked list and then search through the linked list.

The time complexity = $$O(A + B)$$, where A is the length of bucket and B is the length of linked list. A is actually 1 because the magic of hash function and B is usually close to 1 if we making the collisions, meaning values map to same key, as low as possible. As a result, the time complexity is actually $$O(1)$$

### dynamic programming

[dynamic programming]({{site.baseurl}}/dsa/2023/03/24/dynamic-programming.html)

### sorting

[sorting]({{site.baseurl}}/dsa/2023/03/09/sorting.html)

## what

Try to give real world example

## TODO

* key concepts (according to cracking the coding interview)
  * bit Manipulation
  * memory (stack vs. heap)

## reference

cracking the coding interview

[**The top data structures you should know for your next coding interview**](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
