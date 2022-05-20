---
layout: post
title: basic concept related to DSA
description: ''
date: '2022-05-02'
categories: 'mindset'
note: 要把 function plot 那邊包成自己的 JS module，再 import 進來重複使用，然後要盡量在修好一點。到 74 頁」
mathjax: true
mermaid: true
p5:
threeJS:
---

## Introduction

This article describes the basic concepts related to data structure and algorithm.

* complexity
  * concept of complexity
  * asymptotic notations
  * simpilify notations
* time complexity
  * concept of time complexity
  * amortized time
* space complexity
  * concept of space complexity
* solve the problems correctly

## Why?

Basic data structure and algorithm knowledge is useful for problem solving. We need concepts such as complexity for evaluations,

## How?

### complexity

#### concept

Complexity describes the relationship between the cost we care and the size of input; for example, if we care about the time to produce a product, then the total time to create x books may be

$$Time(n) = 4n^3 + 4n^2 + 3$$

However, in real world problems, it is really hard to get this precise function to describe the total time to produce n amount of books, so we use **asymptotic notations**.

#### asymptotic notations

There are big-O ($$O$$), big-theta ($$\Theta$$), big-omega ($$\Omega$$) and you can check the defination of academia online. Here we focus on the defination of industry. The defination of $$O$$ in industry is the same as the defination of $$\Theta$$ in academia; that is

$$\Theta(g(n)) = \{ f(n) | \exists c_0, c_1, n_0 > 0 \ \ \ \forall n > n_0, s.t. 0 \leq c_0g(n) \leq f(n) \leq c_1g(n) \} $$

given we have some knowledege with set theory. Then f(n) is an element of $$\Theta$$ of g(n), which is what industry care about ($$O$$, big-O); for example, $$2x + 2$$ is an element of $$\Theta(x)$$; then we can use $$x$$ to describe the complexity of $$2x + 2$$. The following plot demostrates that $$2x + 2$$ is wrapped by $$3x$$ and $$x$$ after $$x > 2$$

<canvas id="canvas" width="400" height="200"></canvas>

<script>
function fun1(x) {return (2*x + 2);}
function fun2(x) {return 6*x;}
function fun3(x) {return 2*x;}

function draw() {
 var canvas = document.getElementById("canvas");
 if (null==canvas || !canvas.getContext) return;

 var axes={}, ctx=canvas.getContext("2d");
 axes.x0 = 0;  // x0 pixels from left to x=0
 axes.y0 = canvas.height; // y0 pixels from top to y=0
 axes.scale = 20;                 // 40 pixels from x=0 to x=1
 axes.doNegativeX = true;

 showAxes(ctx,axes);
 funGraph(ctx,axes,fun1,"rgb(11,153,11)",1);
 funGraph(ctx,axes,fun2,"rgb(66,44,255)",2);
 funGraph(ctx,axes,fun3,"rgb(33,22,140)",3);
}

function funGraph (ctx,axes,func,color,thick) {
 var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = 10;
 var iMin = 0;
 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
  if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
  else         ctx.lineTo(x0+xx,y0-yy);
 }
 ctx.stroke();
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = 0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)";
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}

draw()
</script>

#### simpilify notations

Based on the defination, we know that the big O of

* $$2x + 2$$ is $$2x$$ and also $$x$$
* $$2x^2 + x$$ is $$x^2$$ because of $$ \exists \ a, b > 0 \ s.t \ ax^2 < 2x^2 + x < bx^2 \forall \ x>0$$

### time complexity

#### concept of time complexity

* Again, we use the definition of industry
* `Time complexity = O(n)` means it needs to traverse **at most** n elements to get things done

#### amortized time

skip

### space complexity

#### concept of space complexity

* we use the definition of industry
* space complexity = O(n) means it needs to at most n elements of space to get things done

### solve the problems correctly

1. read or listen to the question and ask all the necessary informations, use as little hint as possible
2. brainstorm to think about all the cases, including edge case
3. come up with a brute force solution and write it on paper
4. start to think how to optimize the brute force (on paper)
   * remove any unnecessary information
   * find the bottle neck
   * make time and space complexity trade off
5. walk through the idea again (on paper)
6. start to write code as clean as possible (on computer)
7. write test with general, base, error cases

## What?

### examples

#### example 1 (two liner iteration)

* time complexity = O(A + B)
* space complexity = 

```javascript
for (let i = 0; i < arrayA.length; i++) {
  console.log(arrayA[i])
}
for (let i = 0; i < arrayB.length; i++) {
  console.log(arrayB[i])
}
```

#### example 2 (iteration in a iteration)

* time complexity = O(A * B)
* space complexity = 

```javascript
for (let i = 0; i < arrayA.length; i++) {
  for (let j = 0; j < arrayB.length; j++) {
    console.log(arrayA[i] + arrayB[j])
  }
}
```

#### example 3 (recursive binary search)

* time complexity = O(log N)
* space complexity = 

Given a sorted array, the binary search algorithm as follow:

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

For example, if the number of the elements in an array is 16, then it at most need to work through 5 elements to find the target with steps:

the middle element of 16 elements (step 1) -> the middle element of 8 elements (step 2) -> the middle element of 4 elements (step 3) -> the middle element of 2 elements (step 4) -> the middle element of 1 element (step 5)

As a result, we can describe the number of traverse (k) with the number of elements (N) as follow:

$$N = 2^k$$, which means

$$k = log_2N = logN$$, which means

$$O(logN)$$

#### example 4 (recursive, like fibonacci series)

* time complexity = $$O(2^N)$$
* space complexity = $$O(N)$$

```javascript
function f(n) {
  if(n <= 1) {
    return 1;
  } else {
    return f(n-1) + f(n-1);
  }
}
```

If n = 3, then the total nodes is 7 (1 + 2 + 4) as follow:

<div class="mermaid">
graph TD
  id1((f_3)) --> id2((f_2))
  id1((f_3)) --> id3((f_2))

  id2((f_2)) --> id4((f_1))
  id2((f_2)) --> id5((f_1))

  id3((f_2)) --> id6((f_1))
  id3((f_2)) --> id7((f_1))
</div>

Then the time complexity = O(1 + 2 + 4 + ... + 2^(n-1)) = O(2^n - 1) = O(2^n)

The data we need to store is f(1), f(2), ... f(n), meaning the space complexity = O(n)

example 5 (two loop with same length (n) of array)

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

example 6 (related iteration in a iteration)

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

### example of solving problems correctly

#### BUD (Bottlenecks, Unnecessary work, Duplicated work)

* example: Given an array of distinct integer values, count the number of pairs of integers that have difference k. For example, given the array {1, 7, 5, 9, 2, 12, 3} and the difference k = 2,there are four pairs with difference 2: (1, 3), (3, 5), (5, 7), (7, 9).
* brute force:

```javascript
array = [1, 7, 5, 9, 2, 12, 3]
k = 2
result = []
for (i in array) {
  for (j = i + 1 in array) {
    if abs(i - j) = k {
      result << [i, j]
    }
  }
}
```

note that here I just write down the quick idea and did not care the bugs and the total of elements walked through is

$$N + (N-1) + ... + 1 = (1 + N)*N/2 = O(N^2)$$

* Bottleneck:

The bottleneck here is the double loops. We can try to implement binary search on the inner loop; however, this operation needs to sort the array first. As a result, we can use hash table as follow:

```javascript
array = [1, 7, 5, 9, 2, 12, 3]
k = 2
result = []
hash_table = {}
for (i in array) {
  hash_table[i] = i
}
for (i in array) {
  result << [i, hash_table[i+k]] if i+k in array
  result << [i, hash_table[i-k]] if i-k in array
}
```

The total run time will be 2N, meaning $$O(N)$$

## Reference

cracking the coding interview
