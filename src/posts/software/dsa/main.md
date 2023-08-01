# Title

## Abstract

This article aims to solve a programming problem in a more efficient manner by analyzing and comparing the time complexity of CRUD operations on various data structures. It provides a concise overview of each data structure's time complexity for create, read, update, and delete actions, helping programmers make informed decisions on data structure selection.

## Purpose

To [solve problem] in a more efficient way, making no more space to improve both the [time complexity and space complexity].

## Concept

We can decompose all the programming logics into four actions: create, read, update, delete. The **time complexity** of CRUD an element in specific data structure is as follow: (The order is based on popularity)

|  | Create | Read | Update | Delete |
|:-:|:-:|:-:|:-:|:-:|
| Arrays | O(1) - O(n) | O(1) | O(1) | O(1) - O(n) |
| Linked Lists | O(1) | O(n) | O(n) | O(n) |
| Hash Tables | O(1) | O(1) | O(1) | O(1) |
| Trees | O(1) | O(n) | O(n) | O(n) |
| Graphs | O(1) | O(v+e) | O(1) | O(v+e) |
| Stacks | O(1) | O(1) | O(1) | O(1) |
| Queues | O(1) | O(1) | O(n) | O(1) |
| Heaps | O(1) | O(n) | O(log n) | O(log n) |
| Tries |

* Explanation:
  * "n" refers to the number of total elements in the data structure currently
  * "v" refers to the number of vertices (nodes) in the graph
  * "e" refers to the number of edges in the graph
* Please refer to following sections to see why

## Example

### Array

It is a data structure in programming that stores a collection of elements. These elements are stored in contiguous memory locations, and each element can be accessed using an index or a subscript. Please refer to [array]({{site.baseurl}}/dsa/2022/05/22/array.html) for more information.

### Linked list

A linked list is a linear data structure where elements are stored in a sequence, and each element is linked to its next element using pointers or references. It consists of a series of nodes, where each node contains a data element and a reference to the next node in the sequence. For more information, please refer to [linked list]({{site.baseurl}}/dsa/2022/05/23/linked-list.html).

### Hash Table

A hash table is a data structure that provides fast access to values based on a key. It uses a hash function to map keys to indices in an array, allowing for constant-time access to values, making it an efficient choice for many types of applications. For more information, please refer to [hash table]({{site.baseurl}}/dsa/2023/04/23/hash-table.html).

### Tree

A tree is a hierarchical data structure with nodes connected by edges, and a single root node at the top. It is used in computer science to represent data with a hierarchical structure, and various algorithms have been developed to manipulate and process tree structures efficiently. For more information, please refer to [tree]({{site.baseurl}}/dsa/2022/06/26/tree.html).

### Graph

A graph is a visual representation of data that shows the relationship between different variables. It consists of nodes or vertices connected by edges or links that illustrate the connections or interactions between them. For more information, please refer to [graph](/blog/software/dsa/graph).

### Stack

A stack is an abstract data type that represents a collection of elements in a particular order. It follows the Last-In-First-Out (LIFO) principle, where the last element added to the stack will be the first one to be removed. For more information, please refer to [stack]({{site.baseurl}}/dsa/2022/06/24/stack.html)

### Queue

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, where the first element added to the queue is the first element to be removed. It is commonly used in computer science and everyday life for organizing tasks or processing requests in a sequential manner. For more information, please refer to [queue]({{site.baseurl}}/dsa/2022/06/24/queue.html)

### Heap

A heap is a specialized tree-based data structure that satisfies the heap property, where the value of each node is greater than or equal to (in a max heap) or less than or equal to (in a min heap) the values of its child nodes. Heaps are commonly used for efficient priority queue operations and serve as a foundation for algorithms like heap sort and finding the kth largest/smallest element. For more information, please refer to [heap](/blog/software/dsa/heap).

### Tries

A trie, also known as a prefix tree, is a data structure used to store and search for strings efficiently. It organizes strings by their common prefixes, allowing for fast retrieval and insertion operations. For more information, please refer to [tries]({{site.baseurl}}/dsa/2023/04/26/tries.html)

### Dynamic Programming

Dynamic programming is often applied to problems with recursive sequences of sub-problems, such as graph shortest path and longest common subsequence, by solving each subproblem only once and efficiently addressing large-scale optimization problems. The concept involves breaking down optimization problems into smaller sub-problems, storing and reusing their solutions to avoid redundant computations. For more information, please refer to [dynamic programming]({{site.baseurl}}/dsa/2023/03/24/dynamic-programming.html).

### Sorting

Sorting is a fundamental operation in computer science that involves arranging a collection of elements in a specific order. It plays a crucial role in various applications, such as searching, data analysis, and maintaining data integrity, by providing an organized and easily accessible representation of the data. For more information, please refer to [sorting]({{site.baseurl}}/dsa/2023/03/09/sorting.html).

## reference

* [cracking the coding interview](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850)
* [The top data structures you should know for your next coding interview](https://www.freecodecamp.org/news/the-top-data-structures-you-should-know-for-your-next-coding-interview-36af0831f5e3/)
