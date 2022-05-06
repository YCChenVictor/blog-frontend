---
layout: post
title: basic concept related to DSA
description: ''
date: '2022-05-02'
categories: 'mindset'
note: 改用其他畫 function plot 的方法，例如 chart.js
mathjax: true
mermaid:
p5:
threeJS:
function_plot: true
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

$$Time(n) = 4n^3 + 4n^2 + 3$$

However, in real world problems, it is really hard to get this precise function to describe the total time to produce n amount of books, so we use **asymptotic notations**.

#### asymptotic notations

There are big-O ($$O$$), big-theta ($$\Theta$$), big-omega ($$\Omega$$) and you can check the defination of academia online. Here we focus on the defination of industry. The defination of $$O$$ in industry in the save as the defination of $$\Theta$$ in academia; that is

$$\Omega(g(n)) = \{ f(n) | \exists c_0, c_1, n_0 > 0 \ \ \ \forall n > n_0, s.t. 0 \leq c_0g(n) \leq f(n) \leq c_1g(n) \} $$

given we have some knowledege with set theory. Then f(n) is an element of $$\Theta$$ of g(n), which is what industry care about ($$O$$, big-O); for example, $$4n^3 + 4n^2 + 3$$ is an element of $$\Theta(n^3)$$; then we can use $$n^3$$ to describe the complexity of $$4n^3 + 4n^2 + 3$$.

<div id="root" class=''></div>

<script type='module'>
let width = 400;
let height = 400;

functionPlot({
  target: "#root",
  width,
  height,
  yAxis: { domain: [0, 50] },
  xAxis: { domain: [0, 10] },
  grid: true,
  data: [
    {
      fn: "4x^3 + 4x^2 + 3",
      title: 'xxx'
    },
    {
      fn: "4x^3",
    },
    {
      fn: "5x^3",
    }
  ]
});
</script>

#### time complexity

We ignore the math definition of big o and use the definition of big o in industry. `Time complexity = O(n)` means it needs to traverse **at most** n elements to get things done; for example, given a singly linked list, if we want to read the last element of this list, we need to traverse all the nodes; as a result, the time complexity is O(n).

#### space complexity

We also ignore the math definition of big o and use the definition of big o in industry. Space complexity means how many elements needed for this problem to be done at most; for example, given a singly linked list with n elements, if we want to remove an element of this list, given we have the address of this element, we need to find this element first and then change the pointer of the previous node to the next node. On the storage, we do not need more space to find the next node but need one more space to save the address of the next node and change the pointer of previous node to this address, meaning the space complexity = O(1).

#### exams

for example, (一個 iterate 一個 loop)

```ruby

```

### pointer

## Reference

cracking the coding interview
