---
layout: post
title:
description: ''
date: '2023-06-02'
categories: DSA
note:
mathjax:
mermaid: true
p5:
threeJS:
chartJS: true
anchor:
publish: true
---

## Introduction

TBC

## Why?

Learning QuickSort not only equips you with a fast sorting algorithm but also enhances your understanding of the Divide and Conquer technique, improves your algorithmic thinking skills, and broadens your problem-solving capabilities.

## How?

### Divide and Conquer Technique

This technique breaks down a problem into smaller subproblems and solving them independently. For example,




Euclid’s algorithm

### Efficiency

QuickSort has an average runtime of O(n log n), which means it can sort a list of elements efficiently. Comparing it to other sorting algorithms, like Merge Sort, QuickSort typically performs better due to a smaller constant factor. This makes QuickSort a valuable algorithm to learn when efficiency is a concern.

### Pivot Selection

QuickSort uses a random element as the pivot, which adds an element of randomness to the algorithm. This randomness contributes to the efficiency of QuickSort and makes it less likely to encounter worst-case scenarios compared to other sorting algorithms.

### Algorithmic Thinking

Learning QuickSort allows you to enhance your algorithmic thinking skills. It presents you with an elegant and efficient solution to the sorting problem and helps you understand how to design algorithms that solve specific types of problems.

### Problem Solving

By learning QuickSort, you expand your problem-solving toolkit. When faced with a new problem, you can now consider if the Divide and Conquer technique, similar to QuickSort, can be applied to solve it. This broader perspective enables you to approach a wide range of problems with a more structured and efficient mindset.

## What?

## Other

* code example
  ```javascript
  function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
  }
  
  function partition(arr, left, right) {
    const pivot = arr[right]; // Choosing the rightmost element as the pivot
    let partitionIndex = left;
    
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        swap(arr, i, partitionIndex);
        partitionIndex++;
      }
      console.log(arr)
    }
    
    swap(arr, partitionIndex, right); // Placing the pivot element in its correct position
    return partitionIndex;
  }
  
  function swap(arr, i, j) {
    console.log([i, j])
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  // Example usage:
  const arr = [8, 3, 1, 5, 2, 9, 4, 7, 6];
  const sortedArr = quickSort(arr);
  console.log(sortedArr); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
* Visualization: [Learn Quick Sort in 13 minutes](https://www.youtube.com/watch?v=Vtckgz38QHs)
* Time complexity

## Reference

Why: asking for the reason or purpose behind something.
How: asking for the method or process of doing something.
What: asking for information about a specific thing or object.
