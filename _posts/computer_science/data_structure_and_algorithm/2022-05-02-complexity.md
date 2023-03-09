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

However, in real world problems, precise function to describe the total time of producinf n amount of books does not exist at all, so we use **asymptotic notations**.

#### asymptotic notations

There are notations such as big-O ($$O$$), big-theta ($$\Theta$$), big-omega ($$\Omega$$); please check the defination in academia online by yourself. Here we focus on the defination of industry. The defination of $$O$$ in industry is the same as the defination of $$\Theta$$ in academia; that is

$$\Theta(g(n)) = \{ f(n) | \exists c_0, c_1, n_0 > 0 \ \ \ \forall n > n_0, s.t. 0 \leq c_0g(n) \leq f(n) \leq c_1g(n) \} $$

given we have some knowledege with set theory. Then f(n) is an element of $$\Theta$$ of g(n), which is what industry care about ($$O$$, big-O); for example, $$2x + 100$$ is an element of $$\Theta(x)$$; then we can use $$x$$ to describe the complexity of $$2x + 100$$. The following plot demostrates that $$2x + 100$$ is wrapped by $$3x$$ and $$x$$ after $$x > 100$$

(redraw following graph with react plotly)

<canvas id="canvas" width="400" height="200"></canvas>

<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = ctx.canvas.width;
const height = ctx.canvas.height;
const xFrom = 0
const yFrom = canvas.height
const range = [0, 10]
const xSlope = 100
const ySlope = 1/4

function fun1(x) {return (2*x + 100);}
function fun2(x) {return 3*x;}
function fun3(x) {return x;}

function draw() {
  if (canvas==null || !canvas.getContext) return;

  showXAxes(ctx);
  // showYAxes(ctx);
  funGraph(ctx, fun1, "rgb(11,153,11)", 1);
  funGraph(ctx, fun2, "rgb(66,44,255)", 2);
  funGraph(ctx, fun3, "rgb(33,22,140)", 3);
}

function funGraph (ctx, polynomialFunction, color, thick) {
  ctx.beginPath();
  ctx.lineWidth = thick;
  ctx.strokeStyle = color;

  for (let i = range[0]; i <= range[1]; i++) {
    x = xSlope*i;
    y = ySlope*polynomialFunction(x);
    if (i==range[0]) {
      ctx.moveTo(xFrom+x,yFrom-y);
    }
    else {
      ctx.lineTo(xFrom+x,yFrom-y);
      console.log(xFrom+x)
      console.log(yFrom-y)
    }
  }
  ctx.stroke();
}

function showXAxes(ctx) {
  ctx.strokeStyle = "rgb(128,128,128)";
  ctx.beginPath();
  ctx.moveTo(xFrom, height); ctx.lineTo(width, height); // X axis
  ctx.stroke();
}

draw()
</script>

#### notation simplification

Based on the defination, we know that the big O of

* $$2x + 100$$ is $$2x$$ and also $$x$$
* $$2x^2 + x$$ is $$x^2$$ because of $$ \exists \ a, b > 0 \ s.t \ ax^2 < 2x^2 + x < bx^2 \forall \ x>0$$

### time complexity

* Again, we use the definition of industry
* `Time complexity = O(n)` means **at most** n elements **involved** to get things done

#### amortized time

(to be continued)

### space complexity

* we use the definition of industry
* space complexity = O(n) means it needs to at most n elements of space to get things done

## What?

### two liner iteration

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

### iteration in a iteration

* time complexity = O(A * B)
* space complexity = 

```javascript
for (let i = 0; i < arrayA.length; i++) {
  for (let j = 0; j < arrayB.length; j++) {
    console.log(arrayA[i] + arrayB[j])
  }
}
```

### recursive binary search

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

* the middle element of 16 elements (step 1) -> the middle element of 8 elements (step 2) -> the middle element of 4 elements (step 3) -> the middle element of 2 elements (step 4) -> the middle element of 1 element (step 5)

As a result, we can describe the number of traverse (k) with the number of elements (N) as follow:

$$N = 2^k$$

$$=> k = log_2N = logN$$

so the complexity = $$O(logN)$$

### recursive, like fibonacci series

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
