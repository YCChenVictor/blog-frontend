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

Two steps:
* Figure out the base case. This should be the simplest possible case.
* Divide or decrease your problem until it becomes the base case.

For example, given a quadrilateral with length, 1680 and width, 640 and we want to find the largest square to divide it evenly.

```
                1680
   ---------------------------------
  |                                 |
  |                                 | 640
  |                                 |
  |                                 |
   ---------------------------------
```

Step one: the base case, The length is twice the width.

```
         160
   ---------------
  |       |       | 
  |       |       | 80
   ---------------

```

Step two: By Euclid’s algorithm, solving the largest square in 640 X 400 is the same in 1680 X 640

```
        640          640       400
   ---------------------------------
  |            |             |      |
  |            |             |      | 640
  |            |             |      |
  |            |             |      |
   ---------------------------------
```

However, 640 X 400 is not the base case, so keep doing the recursive process -> 640 X 400 => 400 X 240 => 240 X 160 => 160 X 80 and then we find the base case, **160 X 80**.

With above D & C process, we found that 80 X 80 is the largest possible square to divide the quadrilateral evenly.

### Quick Sort

With D & C in mind, we can start to probe quick sort. We want to sort an array and again, we follow the two steps of D & C; that is:

1. Figure out the base case. This should be the simplest possible case.
2. Divide or decrease your problem until it becomes the base case.

The simplest possible case is an array only has one element or no element as follow:

```javascript
[] // empty array
// or
[20] // array with only one element
```

For example, if we want to sort an array: [3, 5, 2, 1, 4], we can try to divide this array until it becomes the base case as follow: (We choose the far-left one  as pivot)

```javascript
quickSort([3, 5, 2, 1, 4]) = 

quickSort([2, 1]) + <3> +  quickSort([5, 4]) = // step 1, O(n)

[1, 2] + <3> + [4, 5] =

[1, 2, 3, 4, 5]
```

and we can also always choose the middle element as pivot

```javascript
quickSort([3, 5, 2, 1, 4]) = 

quickSort([1]) + <2> + quickSort([3, 5, 4]) = // step 1, O(n)

[1] + <2> + (quickSort([3, 4]) + <5> + []) = // step 2, O(n)

[1] + <2> + [3, 4] + <5> + [] =

[1, 2, 3, 4, 5]
```

As you can see, the choice of pivot affects the time complexity and there is no best way to choose the pivot; for example, given a sorted array, `[1, 2, 3, 4, 5]`, and we do the same sorting methods again as follow:

```javascript
quickSort([1, 2, 3, 4, 5]) =
```

## What?

## Other

### Efficiency

QuickSort has an average runtime of O(n log n), which means it can sort a list of elements efficiently. Comparing it to other sorting algorithms, like Merge Sort, QuickSort typically performs better due to a smaller constant factor. This makes QuickSort a valuable algorithm to learn when efficiency is a concern.

### Pivot Selection

QuickSort uses a random element as the pivot, which adds an element of randomness to the algorithm. This randomness contributes to the efficiency of QuickSort and makes it less likely to encounter worst-case scenarios compared to other sorting algorithms.

### Algorithmic Thinking

Learning QuickSort allows you to enhance your algorithmic thinking skills. It presents you with an elegant and efficient solution to the sorting problem and helps you understand how to design algorithms that solve specific types of problems.

### Problem Solving

By learning QuickSort, you expand your problem-solving toolkit. When faced with a new problem, you can now consider if the Divide and Conquer technique, similar to QuickSort, can be applied to solve it. This broader perspective enables you to approach a wide range of problems with a more structured and efficient mindset.

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

grokking-algorithms-illustrated-programmers-curious
