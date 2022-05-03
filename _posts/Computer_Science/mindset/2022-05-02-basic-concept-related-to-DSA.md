---
layout: post
title: basic concept related to DSA
description: ''
date: '2022-05-02'
categories: 'mindset'
note:
mathjax: true
mermaid:
p5:
threeJS:
---

## Introduction

This article describes the basic concepts related to data structure and algorithm.

* complexity
  * time complexity
  * space complexity
  * asymptotic notations
* pointer

## Why?

Basic data structure and algorithm knowledge is useful for problem solving. We need concepts such as complexity for evaluations,

## How?

### complexity

Complexity describes the relationship between the cost we care and the size of input; for example, if we care about the time to produce a product, then the total time to create x books may be

$$Time(x) = x^3 + 4x^2 + 3$$

However, in real world problems, it is really hard to get this precise function to describe the total time to produce x amount of books, so we use **asymptotic notations**.

#### asymptotic notations

draw a graph to demostrate the concepts.

#### time complexity

We ignore the math definition of big o and use the definition of big o in industry. `Time complexity = O(n)` means it needs to traverse **at most** n elements to get things done; for example, given a singly linked list, if we want to read the last element of this list, we need to traverse all the nodes; as a result, the time complexity is O(n).

#### space complexity

We also ignore the math definition of big o and use the definition of big o in industry. Space complexity means how many elements needed for this problem to be done at most; for example, given a singly linked list with n elements, if we want to remove an element of this list, given we have the address of this element, we need to find this element first and then change the pointer of the previous node to the next node. On the storage, we do not need more space to find the next node but need one more space to save the address of the next node and change the pointer of previous node to this address, meaning the space complexity = O(1).

### pointer

## Reference

cracking the coding interview
