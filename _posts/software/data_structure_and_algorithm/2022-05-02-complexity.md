---
layout: post
title:
description: ''
date: '2022-05-02'
categories: DSA
note: 'to be continued'
mathjax: true
mermaid: true
p5:
threeJS:
chartJS: true
publish: true
---

## Introduction

Complexity is a measure of the resources required to solve a problem or execute an algorithm.

* Time complexity refers to the amount of time or number of operations required to solve a problem or execute an algorithm. The goal of analyzing time complexity is to identify algorithms that are efficient and can solve problems within a reasonable amount of time.
* Space complexity refers to the amount of memory or storage space required to solve a problem or execute an algorithm. The goal of analyzing space complexity is to identify algorithms that are efficient in terms of memory usage.

## Why?

Basic data structure and algorithm knowledge is useful for problem solving. With this concept, we can evalute solutions to a problem before diving in.

## How?

### concept

Complexity describes the relationship between the cost we care and the size of input; for example, the total time to create x books may be as follow:

$$Time(n) = 4n^3 + 4n^2 + 3$$

However, in real world problems, precise function to describe the total time of producing n amount of books does not exist at all, so we use **asymptotic notations**.

#### asymptotic notations

There are notations such as big-O ($$O$$), big-theta ($$\Theta$$), big-omega ($$\Omega$$); please check the defination in academia online by yourself. Here we focus on the defination of industry. The defination of $$O$$ in industry is the same as the defination of $$\Theta$$ in academia; that is

$$\Theta(g(n)) = \{ f(n) | \exists c_0, c_1, n_0 > 0 \ \ \ \forall n > n_0, s.t. 0 \leq c_0g(n) \leq f(n) \leq c_1g(n) \} $$

given we have some knowledege with set theory. Then f(n) is an element of $$\Theta$$ of g(n), which is what industry care about ($$O$$, big-O); for example, $$2x + 100$$ is an element of $$\Theta(x)$$; then we can use $$x$$ to describe the complexity of $$2x + 100$$. The following plot demostrates that $$2x + 100$$ is wrapped by $$3x$$ and $$x$$ after $$x > 100$$

<canvas id="big-o-graph" width="400" height="200" class='bg-white'></canvas>

<script>
	const xValues = [];
	const y1Values = [];
	const y2Values = [];
	const y3Values = [];

	for (let x = 0; x <= 300; x++) {
		xValues.push(x);
		y1Values.push(3*x);
		y2Values.push(x);
		y3Values.push(2*x+100);
	}

	const ctx = document.getElementById("big-o-graph").getContext("2d");

	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			labels: xValues,
			datasets: [
				{
					label: "y = 3x",
					data: y1Values,
					borderColor: "red",
					fill: false
				},
				{
					label: "y = x",
					data: y2Values,
					borderColor: "blue",
					fill: false
				},
				{
					label: "y = 2x+100",
					data: y3Values,
					borderColor: "green",
					fill: false
				}
			]
		},
		options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: 'lightGreen',
        }
      }
    }
	});
</script>

#### notation simplification

Based on the defination, we know that the big O of

* $$2x + 100$$ is $$2x$$ and also $$x$$
* $$2x^2 + x$$ is $$x^2$$ because of $$ \exists \ a, b > 0 \ s.t \ ax^2 < 2x^2 + x < bx^2 \forall \ x>0$$

### time complexity

* Again, we use the definition of industry
* `Time complexity = O(n)` means **at most** n elements **involved** to get things done

#### Amortized Time

* Description: In some data structures, individual operations can take significantly longer than others
  * For example, adding an element to an array can take O(n) time if the array needs to be resized, but most additions take constant time O(1)
* Solution: Considers the average time taken by a sequence of operations, rather than just by one single operation
  * Amortized time complexity analysis involves dividing the total time taken by a sequence of operations by the number of operations. This gives us the average time taken per operation, which is a more useful measure of the data structure's performance than the worst-case time complexity of a single operation.
  * Accounting method, which involves assigning a cost to each operation and using the cost to pay for future operations. For example, in an array with dynamic resizing, we could assign a cost of 1 to each add operation, and use the extra time taken by the occasional resize operation to pay for the cost of the future operations.
* Example: add element to array
  * code
    ```javascript
    function addToArray(array, element) {
      if (array.length === array.capacity) {
        const newCapacity = array.capacity * 2;
        const newArray = new Array(newCapacity);
        for (let i = 0; i < array.length; i++) {
          newArray[i] = array[i];
        }
        array = newArray;
        array.capacity = newCapacity;
      }
      array[array.length] = element;
    }
    ```
  * The cost of each add operation is O(1), and the cost of each resize operation is O(n).
  * calculation
    ```javascript
    const array = { capacity: 2, length: 0 };
    addToArray(array, 1); // O(1)
    addToarray(array, 2); // O(1)
    addToArray(array, 3); // O(1 + 2 * 1)

    // O(1 + 1 + 1 + 2 * 1) = O(5)
    // 5/3 = 1.67 => amortized time = O(1.67) = O(1)
    ```

### space complexity

* we use the definition of industry
* space complexity = O(n) means it needs at most n elements of space to get things done

## What?

### two liner iteration

* code
  ```javascript
  for (let i = 0; i < arrayA.length; i++) {
    console.log(arrayA[i])
  }
  for (let i = 0; i < arrayB.length; i++) {
    console.log(arrayB[i])
  }
  ```
* time complexity = O(A + B)
  * Picks A elements from arrayA, each pick = O(1)
  * Picks B elements from arrayB, each pick = O(1)
* space complexity = O(1)
  * Only need a space for i => O(1)


### Iteration in An Iteration

* code
  ```javascript
  for (let i = 0; i < arrayA.length; i++) {
    for (let j = 0; j < arrayB.length; j++) {
      console.log(arrayA[i] + arrayB[j])
    }
  }
  ```
* Time complexity = O(A * B)
  * A will be query with i and B will be query with j in O(1) each
  * The combination of (i, j) = [0..lengthOfA] x [0..lengthOfB]
* Space complexity = O(2) = O(1)
  * The space required by i and j is constant

### recursive binary search

* code
  ```javascript
  function binarySearch (array, target) {
    let middleIndex = Math.floor(array.length / 2)
  
    if (array[middleIndex] === target) {
      return true
    }
  
    if(array.length === 1) {
      return false
    }
  
    if (target > array[middleIndex]) {
      return binarySearch (array.slice(middleIndex, array.length), target)
    } else if (target < array[middleIndex]) {
      return binarySearch (array.slice(0, middleIndex), target)
    }
  }
  ```
* time complexity = O(log N)
  * Given the number of the elements in an array is 16, then it at most need to work through 5 elements to find the target with steps: the middle element of 16 elements (step 1) -> the middle element of 8 elements (step 2) -> the middle element of 4 elements (step 3) -> the middle element of 2 elements (step 4) -> the middle element of 1 element (step 5)
  * We can describe the number of traverse (k) with the number of elements (N) as follow: $$N = 2^k => k = log_2N = logN$$, so the complexity = $$O(logN)$$
* Space complexity = O(log N) for middleIndex
  * Again, given the elements in an array is 16, at most need to work through 5 elements. Because it is recursive, before we find the answer, all the binarySearch will be store in stack and wait the final binarySearch to return answer. Because each binarySearch need one middleIndex, O(1) and it will also be 5 steps, so the space complexity is also O(log N)

### recursive, like fibonacci series

* code
  ```javascript
  function fibonacci(n) {
    if (n < 2) {
      return n;
    }
    else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }
  ```
* time complexity = $$O(2^N)$$
* space complexity = $$O(N)$$

If n = 4, then the total nodes is 7 (1 + 2 + 4) as follow:

<div class="mermaid">
graph TD
  id1((f_4)) --> id2((f_3))
  id1((f_4)) --> id3((f_2))
</div>

Then the time complexity = O(1 + 2 + 4 + ... + 2^(n-1)) = O(2^n - 1) = O(2^n)

The data we need to store is f(1), f(2), ... f(n), meaning the space complexity = O(n)

### two loop with same length (n) of array

* time complexity = $$O(N)$$
* space complexity = 

```javascript
function (array) => {
  let sum = 0;
  let product = 1;

  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  for (let i = 0; i < array.length; i++) {
    product*= array[i];
  }
}
```

The time complexity = O(2N) = O(N)

### related iteration in a iteration

* time complexity = $$O(N^2)$$
* space complexity =

```javascript
function (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; i++) {
      console.log(array[i] + array[j])
    }
  }
}
```

Given there are N elements in this array, the total steps is

$$ N + (N-1) + (N-2) + ... + 1 = (1+N)*N/2$$, meaning the time complexity = O((1+N)*N/2) = O(N^2)

(to be continued with more example in the future)

## Reference

cracking the coding interview
