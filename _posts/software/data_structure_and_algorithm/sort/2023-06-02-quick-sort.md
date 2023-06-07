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

QuickSort is an efficient sorting algorithm with an average runtime of O(n log n). By using a random pivot, it reduces the chances of encountering worst-case scenarios and outperforms other sorting algorithms due to a smaller constant factor. Learning QuickSort enhances algorithmic thinking skills and expands problem-solving abilities, providing an elegant and efficient solution to the sorting problem and introducing the Divide and Conquer technique for a structured approach to various problems.

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
// Always choose the far-left one as pivot

quickSort([3, 5, 2, 1, 4]) = // step 1, O(n)

quickSort([2, 1]) + <3> +  quickSort([5, 4]) = // step 2, O(n)

(quickSort([1]) + <2> + []) + <3> + ([4] + quickSort([5]) + []) = // step 3, O(n)

[1] + <2> + [] + <3> + [4] + [5] + [] =

[1, 2, 3, 4, 5]
```

and we can also always choose the middle element as pivot

```javascript
// always choose the middle one as pivot

quickSort([3, 5, 2, 1, 4]) = // step 1, O(n)

quickSort([1]) + <2> + quickSort([3, 5, 4]) = // step 2, O(n)

[1] + <2> + (quickSort([3, 4]) + <5> + []) = // step 3, O(n)

[1] + <2> + <3> + quickSort([4]) + <5> + [] = // step 4, O(n)

[1] + <2> + <3> + [4] + <5> + [] =

[1, 2, 3, 4, 5]
```

As you can see, the choice of pivot affects the time complexity. In above examples, choosing middle element as pivot has worse time complexity and there is no best way to choose the pivot; for example, given a sorted array, `[1, 2, 3, 4, 5]`, and we do the same sorting methods again as follow:

```javascript
// always choose the far-left one as pivot and time complexity = O(n^2)

quickSort([1, 2, 3, 4, 5]) = // step 1, O(n)

[] + <1> + quickSort([2, 3, 4, 5]) = // step 2, O(n)

<1> + ([] + <2> + quickSort([3, 4, 5])) = // step 3, O(n)

<1> + <2> + ([] + <3> + quickSort([4, 5])) = // step 4, O(n)

<1> + <2> + <3> + <4> + quickSort([5]) = // step 5, O(n)

[1, 2, 3, 4, 5]

// always choose the middle one as pivot

quickSort([1, 2, 3, 4, 5]) = // step 1, O(n)

quickSort([1, 2]) + <3> + quickSort([4, 5]) = // step 2, O(n)

([] + <1> + quickSort([2])) + <3> + ([] + <4> + quickSort([5])) = // step 3, O(n)

[] + <1> + [2] + <3> + [] + <4> + [5] =

[1, 2, 3, 4, 5]
```

As you can see, now choosing middle one as pivot has less time complexity.

## What?

Based on last section, we can now compose the code of quick sort as follow:

```javascript
function quicksort(array) {
  if (array.length < 2) {
    return array;
  } else {
    var pivot = array[0];
    var less = array.slice(1).filter(function(i) { return i <= pivot; });
    var greater = array.slice(1).filter(function(i) { return i > pivot; });
    return quicksort(less).concat([pivot]).concat(quicksort(greater));
  }
}

console.log(quicksort([10, 5, 2, 3]));
```

### Time complexity

TBC

## Other

(TBC)

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
