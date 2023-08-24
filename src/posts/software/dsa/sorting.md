# Title

## Purpose

Learning sorting algorithms is essential for developers as it equips them with the ability to efficiently organize and manipulate data, leading to improved code performance and problem-solving capabilities in various software development scenarios.

## Concept

All the purposes of sorting methods are to arrange a collection of items in a specific order, typically ascending or descending, to make it easier to search, retrieve, or analyze the data.

### Bubble Sort

* Concept: Repeatedly compares adjacent elements and swaps them if they are in the wrong order, "bubbling" the largest (or smallest) element to the end (or beginning) of the list, until the entire list is sorted.
* Example: Sort [5, 2, 8, 1, 4]
  * Step 1: Compares 5 and 2. Since 5 is greater than 2, they are swapped, resulting in [2, 5, 8, 1, 4]
  * Step 2: Compare 5 and 8. Since 5 is smaller than 8, nothing happened.
  * Step 3: Compare 8 and 1. Since 8 is greater than 1, they are swapped, resulting in [2, 5, 1, 8, 4]
  * Step 4: Compare 8 and 4. Since 8 is greater than 4, they are swapped, resulting in [2, 5, 1, 4, 8]
  * After the first pass, the largest number has "bubbled" to the end of the list. And we do the same thing again and again ([2, 5, 1, 4, 8] => [2, 1, 4, 5, 8] => [1, 2, 4, 5, 8])
* Time complexity: O(n^2)
  * Because (n - 1) + (n - 2) + ... + 1 = (1 + (n-1)) * (n-1) / 2
* Space complexity: O(1)
  * We only need a space to store the element going to be swap
* Code:
  ```javascript
  function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
  ```

### Selection Sort

* Concept: Find the smallest (or largest) element in each iteration and swapping it with the element at the beginning of the unsorted portion until the entire list is sorted.
* Example: Sort [5, 2, 8, 1, 4]
  * Step 1: Find out the smallest element is 1 and swap it with first element => [1, 2, 8, 5, 4], time complexity = O(n)
  * Step 2: Find out the smallest element is 2 and swap it with second element => [1, 2, 8, 5, 4], time complexity = O(n - 1)
  * And the same logic => [1, 2, 4, 5, 8], time complexity = O(n - 2)
  * Same logic => [1, 2, 4, 5, 8], time complexity = O(n - 3)
  * Same logic => [1, 2, 4, 5, 8], time complexity = O(n - 4)
* Time complexity: O(n^2)
  * Because (n - 1) + (n - 2) + ... + 1 = (1 + (n-1)) * (n-1) / 2
* Space complexity: O(1)
  * We only need a space to store the element going to be swap
* Code:
  ```javascript
  function selectionSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      var minIndex = i;
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j; // you still need to compare the min value even if it is in correct position
        }
      }
      if (minIndex !== i) { // we do not need the swap when it is already in correct position
        var temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  }
  ```

### Merge Sort

* Concept: Merge sort is a divide-and-conquer algorithm that recursively divides an array into smaller sub-arrays, sorts them, and then merges the sorted sub-arrays to produce a sorted array.
* Example: Sort [8, 3, 5, 1, 9, 2]
  * Step 1: Recursively divide array into halves until it is a base example: [8], [3], [5], [1], [9], [2].
    ```mermaid
    graph TD
      id1((8, 3, 5, 1, 9, 2)) --> id2((8, 3, 5))
      id1((8, 3, 5, 1, 9, 2)) --> id3((1, 9, 2))

      id2((8, 3, 5)) --> id4((8, 3))
      id2((8, 3, 5)) --> id5((5))
      
      id3((1, 9, 2)) --> id6((1, 9))
      id3((1, 9, 2)) --> id7((2))

      id4((8, 3)) --> id8((8))
      id4((8, 3)) --> id9((3))

      id6((1, 9)) --> id10((1))
      id6((1, 9)) --> id11((9))
    ```
  * Step 2: Merge the individual elements in sorted order => [3, 8], [5], [1, 9], [2]
  * Step 3: Again => [3, 5, 8], [1, 2, 9]
  * Step 4: Again => [1, 2, 3, 5, 8, 9]
* Time complexity
  * n * log(n)
  * As you can see on the above graph, given the split process, the number of layer is always log_2^N and in each layer, we walk through n elements to make comparison and compose the result array.
* Code
  ```javascript
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);
  
    const merge = (leftArr, rightArr) => {
      let merged = [];
      let leftIdx = 0;
      let rightIdx = 0;
  
      while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
        if (leftArr[leftIdx] < rightArr[rightIdx]) {
          merged.push(leftArr[leftIdx++]);
        } else {
          merged.push(rightArr[rightIdx++]);
        }
      }
  
      return merged.concat(leftArr.slice(leftIdx)).concat(rightArr.slice(rightIdx)); // deal with the remaining elements
    };
  
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
  }
  
  // Example usage:
  const arr = [8, 3, 1, 5, 2, 9, 4, 7, 6];
  const sortedArr = mergeSort(arr);
  console.log(sortedArr); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```

### Quick Sort

#### Purpose

Learning QuickSort not only equips you with a fast sorting algorithm but also enhances your understanding of the Divide and Conquer technique, improves your algorithmic thinking skills, and broadens your problem-solving capabilities.

#### Concept

QuickSort is an efficient sorting algorithm with an average runtime of **O(n * log(n))**. By using a **random pivot**, it reduces the chances of encountering worst-case scenarios and outperforms other sorting algorithms due to a **smaller constant factor**. Learning QuickSort enhances algorithmic thinking skills and expands problem-solving abilities, providing an elegant and efficient solution to the sorting problem and introducing the **Divide and Conquer** technique for a structured approach to various problems.
  
##### Divide and Conquer Technique: (Two steps)

* Figure out the **base case**. This should be the simplest possible case. **Divide** or decrease your problem until it becomes the base case.
* For example, given a quadrilateral with length, 1680 and width, 640 and we want to find the largest square to divide it evenly.
  ```bash
                  1680
     ---------------------------------
    |                                 |
    |                                 | 640
    |                                 |
    |                                 |
     ---------------------------------
  ```
  * Step one: the base case, The length is twice the width.
    ```bash
             160
       ---------------
      |       |       | 
      |       |       | 80
       ---------------
    ```
  * Step two: By Euclid’s algorithm, solving the largest square in 640 X 400 is the same in 1680 X 640
    ```bash
            640          640       400
       ---------------------------------
      |            |             |      |
      |            |             |      | 640
      |            |             |      |
      |            |             |      |
       ---------------------------------
    ```
  * However, 640 X 400 is not the base case, so keep doing the recursive process -> 640 X 400 => 400 X 240 => 240 X 160 => 160 X 80 and then we find the base case, **160 X 80**.

With above D & C process, we found that 80 X 80 is the largest possible square to divide the quadrilateral evenly.

##### D & C in Quick Sort

With D & C in mind, we can start to probe quick sort. We want to sort an array and again, we follow the two steps of D & C; that is
* Figure out the base case. This should be the simplest possible case.
* Divide or decrease your problem until it becomes the base case.

The simplest possible case is an array only has one element or no element as follow:

```javascript
[] // empty array
// or
[20] // array with only one element
```
  
For example, if we want to sort an array: [3, 5, 2, 1, 4], we can try to divide this array until it becomes the base case as follow: (We choose the far-left one  as pivot)

* Far-left one as pivot for [3, 5, 2, 1, 4]
  ```javascript
  quickSort([3, 5, 2, 1, 4]) = // step 1, O(n)
  
  quickSort([2, 1]) + <3> +  quickSort([5, 4]) = // step 2, O(n)
  
  (quickSort([1]) + <2> + []) + <3> + ([4] + quickSort([5]) + []) = // step 3, O(n)
  
  [1] + <2> + [] + <3> + [4] + [5] + [] =
  
  [1, 2, 3, 4, 5]
  ```
* Middle one as pivot for [3, 5, 2, 1, 4]
  ```javascript
  quickSort([3, 5, 2, 1, 4]) = // step 1, O(n)
  
  quickSort([1]) + <2> + quickSort([3, 5, 4]) = // step 2, O(n)
  
  [1] + <2> + (quickSort([3, 4]) + <5> + []) = // step 3, O(n)
  
  [1] + <2> + <3> + quickSort([4]) + <5> + [] = // step 4, O(n)
  
  [1] + <2> + <3> + [4] + <5> + [] =
  
  [1, 2, 3, 4, 5]
  ```
      
As you can see, the choice of pivot affects the time complexity. In above examples, choosing middle element as pivot has worse time complexity and there is no best way to choose the pivot; for example, given a sorted array, `[1, 2, 3, 4, 5]`, and we do the same sorting methods again as follow:

* Far-left one as pivot to [1, 2, 3, 4, 5]
  * Time complexity: O(n^2)
  * Result
    ```javascript
    quickSort([1, 2, 3, 4, 5]) = // step 1, O(n)
    
    [] + <1> + quickSort([2, 3, 4, 5]) = // step 2, O(n)
    
    <1> + ([] + <2> + quickSort([3, 4, 5])) = // step 3, O(n)
    
    <1> + <2> + ([] + <3> + quickSort([4, 5])) = // step 4, O(n)
    
    <1> + <2> + <3> + <4> + quickSort([5]) = // step 5, O(n)
    
    [1, 2, 3, 4, 5]
    ```
* Middle one as pivot to [1, 2, 3, 4, 5]
  * Time complexity = O(n * log(n))
  * Result
    ```javascript
    quickSort([1, 2, 3, 4, 5]) = // step 1, O(n)
    
    quickSort([1, 2]) + <3> + quickSort([4, 5]) = // step 2, O(n)
    
    ([] + <1> + quickSort([2])) + <3> + ([] + <4> + quickSort([5])) = // step 3, O(n)
    
    [] + <1> + [2] + <3> + [] + <4> + [5] =
    
    [1, 2, 3, 4, 5]
    ```

As you can see, now choosing middle one as pivot has less time complexity.

##### code

Based on last section, we can now compose the code of quick sort as follow:

```javascript
function quicksort(array) {
  if (array.length < 2) { // base case
    return array;
  } else {
    var pivot = array[0]; // always choose far-left as pivot (can also randomly choose)
    var less = array.slice(1).filter(function(i) { return i <= pivot; });
    var greater = array.slice(1).filter(function(i) { return i > pivot; });
    return quicksort(less).concat([pivot]).concat(quicksort(greater));
  }
}

console.log(quicksort([10, 5, 2, 3]));
```

##### Time complexity

We can express time complexity of quick sort as follow:

$$T(n) = T(k) + T(n-k-1) + O(n)$$

where
  * n is the number of elements
  * k is the number of element in left partition
  * n-k-1 is the number of element in right partition
  * O(n) is the time complexity on this round comparison. (We need to compare the values to the pivot so that we can put elements on left or right partition.) 

It is O(n^2) on worst case and O(n * log(n)) on average.

O(n^2) on worst case: As shown above and if we always choose far-left element as pivot, we will have time complexity as follow

$$T(n) = T(1) + T(n-2) + O(n)$$

$$T(n) = T(1) + T(1) + T(n-3) + O(n)$$

...

$$T(n) = T(1) + T(1) + ... T(1) + O(n)$$

and we have time complexity of $$O(n^2)$$

O(n * log(n)) on average: Suppose we randomly choose elements as pivot, then as shown above, we have certain chance to decrease the number of rounds. In best situation (each round the pivot divide elements equally), we only need to go through $$log_2n$$ rounds. And in other cases, we still can go through only $$log_an$$ rounds. As a result the time complexity on average is O(n * log(n)).

$$T(n) = T(k) + T(n-k-1) + O(n)$$

$$T(n) = [T(m) + T(k-m-1) + O(k)] + [T(l) + T(n-k-l-1) + O(n-k-1)] + O(n)$$ =

$$T(n) = [T(m) + T(k-m-1)] + [T(l) + T(n-k-l-1)] + 2 * O(n)$$

...

The number of layers is $$log_an$$ and we have time complexity of $$O(n * log n)$$

Why quick sort is often faster than merge sort? When both algorithms have **the same O times, constant matters**. QuickSort tends to have smaller constant factors compared to Merge Sort. The partitioning step in QuickSort is usually faster than the merging step in Merge Sort, leading to a lower constant factor and faster overall performance.

## Reference

grokking-algorithms-illustrated-programmers-curious

[An Overview of QuickSort Algorithm](https://towardsdatascience.com/an-overview-of-quicksort-algorithm-b9144e314a72)


### Binary Search

Ok, after we sort an array we usually use binary search.

* Concept: Binary search is a divide-and-conquer algorithm that efficiently searches for a target value in a sorted array by repeatedly dividing the search space in half.
* Example:
  ```mermaid
  graph TD
    id1((1, 2, 3, 5, 8, 9)) --> id2((1, 2, 3))
    id1((1, 2, 3, 5, 8, 9)) --> id3((5, 8, 9))

    id2((1, 2, 3)) --> id4((1, 2))
    id2((1, 2, 3)) --> id5((3))
      
    id3((5, 8, 9)) --> id6((5, 8))
    id3((5, 8, 9)) --> id7((9))

    id4((1, 2)) --> id8((1))
    id4((1, 2)) --> id9((2))

    id6((5, 8)) --> id10((5))
    id6((5, 8)) --> id11((8))
  ```
* Time complexity
  * It is O(logN)
  * As you can see, we at most to walk through log_2&N elements to find the desired value

### Sorted Merge

* Question: You are given two sorted arrays, A and B, where A has a large enough buffer at the end to hold B. Write a method to merge B into A in sorted order.
* Concept: Record the current largest number form both A and B and compare these two number. Retrieve the bigger one and assign the next number as bigger one. The time complexity will at most be $$N(lengthA + lengthB)$$
* Code
  ```javascript
  SortedMerge = (arrayA, arrayB) => {
    const result = []
    let largestIndexA = 0
    let largestIndexB = 0
    while ((largestIndexA < arrayA.length) && (largestIndexB < arrayB.length)) {
      const elementA = arrayA[largestIndexA]
      const elementB = arrayB[largestIndexB]
  
      if (elementA <= elementB) {
        result.push(elementA)
        largestIndexA += 1
      } else {
        result.push(elementB)
        largestIndexB += 1
      }
    }
  
    result.push(...arrayA.slice(largestIndexA))
    result.push(...arrayB.slice(largestIndexB))
  
    return result
  }
  
  module.exports = SortedMerge
  ```
* Test
  ```javascript
  const SortedMerge = require('../examples/sorted_merge.js')

  describe('SortedMerge', () => {
    it('should return sorted merged result', () => {
      expect(SortedMerge([5, 12, 18, 23, 27, 31, 42, 55, 63, 78], [9, 15, 20, 34, 45])).toEqual([5, 9, 12, 15, 18, 20, 23, 27, 31, 34, 42, 45, 55, 63, 78])
    })
  })
  ```

## TODO

* Sorted Merge
* Group Anagrams
* Search in Rotated Array
* Sorted Search, No Size
* Sparse Search
* Sort Big File
* Missing Int
* Find Duplicates
* Sorted Matrix Search
* Rank from Stream
* Peaks and Valleys

## What?

### E-commerce websites

Sorting algorithms are used to sort products on e-commerce websites based on price, popularity, ratings, and other criteria. The specific algorithm used by sort() varies depending on the JavaScript engine and environment. It commonly utilizes a variation of QuickSort.

```javascript
// An array of objects representing shoes
const shoes = [
  { name: "Nike Air Zoom Pegasus 38", price: 110, popularity: 8 },
  { name: "Adidas Ultraboost 21", price: 180, popularity: 9 },
  { name: "New Balance Fresh Foam 1080v11", price: 150, popularity: 7 },
  { name: "Brooks Ghost 14", price: 130, popularity: 6 },
  { name: "Hoka One One Bondi 7", price: 150, popularity: 8 }
];

// Sort the shoes by price in ascending order
shoes.sort(function(a, b) {
  return a.price - b.price;
});

// Output: 
// [
//   { name: "Nike Air Zoom Pegasus 38", price: 110, popularity: 8 },
//   { name: "Brooks Ghost 14", price: 130, popularity: 6 },
//   { name: "New Balance Fresh Foam 1080v11", price: 150, popularity: 7 },
//   { name: "Hoka One One Bondi 7", price: 150, popularity: 8 },
//   { name: "Adidas Ultraboost 21", price: 180, popularity: 9 }
// ]
```

## Reference

ChatGPT

cracking the coding interview
