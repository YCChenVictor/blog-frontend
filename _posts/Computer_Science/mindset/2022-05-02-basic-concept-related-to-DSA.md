---
layout: post
title: basic concept related to DSA
description: ''
date: '2022-05-02'
categories: 'mindset'
note: 我想我可能要用個 anchor
mathjax: true
mermaid: true
p5:
threeJS:
---

## Introduction

This article describes the basic concepts related to data structure and algorithm as follow:

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
  * bottleneck, Unnecessary work, Duplicated work
  * real world example
  * simplest form, then stack up
  * generalize
  * fit into data structure
  * figure time complexity first
  * clean code (please refer to 2022-02-07-clean-code.md)

In the how section, it describes the general idea of these points and it the what section, it demonstrates the real examples.

## Why?

Basic data structure and algorithm knowledge is useful for problem solving. We need concepts such as complexity for evaluations,

## How?

### complexity

#### concept of complexity

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
4. optimize the brute force (on paper)
   * think about bottleneck, Unnecessary work, Duplicated work
   * just think of the real world example
   * start from the simplest form and then stack up
   * fit the problem into a specific data structure and use the related knowledge
   * try to find more general solution
   * try to figure out the best time complexity first
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

* example: Print all positive integer solutions to the equation $$a^3 + b^3 = c^3 + d^3$$ where a, b, c, and d are integers between 1 and 1000.

* brute force:

```javascript
k = 1000
result = []
for (a in [1..1000]) {
  for (b in [1..1000]) {
    for (c in [1..1000]) {
      for (d in [1..1000]) {
        if (a^3 + b^3 = c^3 + d^3) {
          result.append([a, b, c, d])
        }
      }
    }
  }
}
```

The time complexity is $$O(N^4)$$

* unnecessary work

We should always observe any unnecessary work first because it is truly not part of the problem we are going to solve. In the brute force above the loop in `d` is an unnecessary work and should be remove as follow:

```javascript
k = 1000
result = []
for (a in [1..1000]) {
  for (b in [1..1000]) {
    for (c in [1..1000]) {
      d = (a^3 + b^3 - c^3)^(1/3)
      if (a^3 + b^3 = c^3 + d^3) {
        result.append([a, b, c, d])
      }
    }
  }
}
```

Then the time complexity will decrease to $$O(N^3)$$

* Bottlenecks

Then we start to solve the problem. When we talk about bottleneck, it means the place having the highest time complexity. To solve it, we usually have two approaches: cost some space or sort it. Given it is already from 1 to 1000, cost some space should direct to the solution.

The easiest way to use space for solving problem is the concept of hash table. We can store the data in the upper loops and use this data in the later loop. For example, we can decrease the time complexity with following approach:

```javascript
k = 1000
result = []
hash_table = {}
for (a in [1..1000]) {
  for (b in [1..1000]) {
    hash_table[a^3 + b^3] << [a, b]
  }
}

for (c in [1..1000]) {
  for (d in [1..1000]) {
    if (c^3 + d^3 exist in hash_table) {
      result.append([hash_table[c^3 + d^3], [c, d]])
    }
  }
}
```

Given a, b, c, d will all loop through 1 to 1000, the time complexity = $$O(2N^2) = O(N^2)$$

* Duplicated work

Although the complexity is already in $$O(N^2)$$; however, it is actually $$O(2N^2)$$ and the first nested for loops are the same as the second nested for loops, which is duplicated work. We can simplify it further with

```javascript
k = 1000
result = []
hash_table = {}
for (a in [1..1000]) {
  for (b in [1..1000]) {
    hash_table[a^3 + b^3] << [a, b]
  }
}

for element in hash_table {
  if (count(element) > 1) {
    result << select(element, 2) // select two out of this element
  }
}
```

Then the time complexity = $$O(N^2 + AB)$$, where A is the number of elements in hash table and B is the number of items in each element, meaning $$A, B < N$$. Then time complexity = $$O(N^2)$$

#### just think of the real world example

Again, we use the problems, finding all a, b, c, d, which $$a^3 + b^3 = c^3 + d^3$$. If we need to do it by brain, then what should we do to find the result quickly?

We will write down the result of $$a^3 + b^3$$ from 1 to 1000 and then find the pair of (c, d) to map (a, b) and this is the concept of hash table.

#### try to find more general solution

(to be continued)

For example, to check whether a tic-tac-toe game has a winner, we should not suppose it is asking the winner from 3x3 board. With generalization, we have more chance to fit the problem into specific data structure and solve it.

#### start from the simplest form and then stack up

* example: Design an algorithm to print all permutations of a string. For simplicity, assume all characters are unique.
* brute force:

```javascript
string = 'abcdefg' // all characters are unique
result = []
length = len(string)
targets = []
for (i in length) {
  targets << string[0..(length-i)]
}
for (target in targets) {
  result << shuffle(target)
}

function shuffle (string) => {
  // some brute force algorithm with O(N!)
  // when string = 'abc', results = 'abc', 'acb', 'bac', 'bca', 'cab', 'cba', the times is 3! 
}
```

Then the time complexity = $$N + N * N! = O( N*N! )$$. We can start from string = 'a', then string 'ab', ...etc and we will find out that the desired result of 'ab' is based on the result of 'a' and append 'b' on both side of the result of 'a' and so on as follow:

```javascript
{
  'a',
  'ab', 'ba',
  'cab', 'abc', 'cba', 'bac',
  'dcab', ...
  ...
}
```

As a result the algorithm would be

```javascript
string = 'abcdefg' // all characters are unique

function getPermutationsBasedOnLastOne (string, lastPermutations) {
  length = len(string)
  lastPermutations = getPermutationsBasedOnLastOne (string[0..(length-1)], lastPermutations)
  for (Permutation in lastPermutations) {
    result << string[-1] + Permutation
    result << Permutation + string[-1]
  }
  return result
}
```

Usually, this approach will lead to a recursive solution.

#### figure out the best time complexity first

We can start from the big picture by calculating the best time complexity first; for example, in the problem of $$a^3 + b^3 = c^3 + d^3$$, we know that we must at least know the result of $$a^3 + b^3$$, so the best time complexity will be $$O(N^2)$$ and once we find out an algorithm with $$O(N^2)$$, we can wrap up.

## Reference

cracking the coding interview
