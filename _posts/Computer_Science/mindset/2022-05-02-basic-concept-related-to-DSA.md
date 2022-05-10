---
layout: post
title: basic concept related to DSA
description: ''
date: '2022-05-02'
categories: 'mindset'
note: 要把 function plot 那邊包成自己的 JS module，再 import 進來重複使用，然後要盡量在修好一點
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

## How? & What?

### complexity

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

Based on the defination, we know that the big O of

* $$2x + 2$$ is $$2x$$ and also $$x$$
* $$2x^2 + x$$ is $$x^2$$ because of $$ \exists \ a, b > 0 \ s.t \ ax^2 < 2x^2 + x < bx^2 \forall \ x>0$$

#### time complexity

* Again, we use the definition of industry
* `Time complexity = O(n)` means it needs to traverse **at most** n elements to get things done
* example: O(A + B)

```javascript
for (let i = 0; i < arrayA.length; i++) {
  console.log(arrayA[i])
}
for (let i = 0; i < arrayB.length; i++) {
  console.log(arrayB[i])
}
```

* example: O(A * B)

```javascript
for (let i = 0; i < arrayA.length; i++) {
  for (let j = 0; j < arrayB.length; j++) {
    console.log(arrayA[i] + arrayB[j])
  }
}
```



#### space complexity

We also ignore the math definition of big o and use the definition of big o in industry. Space complexity means how many elements needed for this problem to be done at most; for example, given a singly linked list with n elements, if we want to remove an element of this list, given we have the address of this element, we need to find this element first and then change the pointer of the previous node to the next node. On the storage, we do not need more space to find the next node but need one more space to save the address of the next node and change the pointer of previous node to this address, meaning the space complexity = O(1).

#### exams

for example, (一個 iterate 一個 loop)

```ruby

```

### pointer

## Reference

cracking the coding interview
