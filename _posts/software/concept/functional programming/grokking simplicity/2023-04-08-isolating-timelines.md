---
layout: post
title:
description: ''
date: '2023-04-08'
categories: functional-programming
note:
mathjax: true
mermaid:
p5:
threeJS:
anchor:
publish: true
---

There’s a bug! (V)
The timeline diagram shows what happens over time (V)
The two fundamentals of timeline diagrams (V)
Two tricky details about the order of actions (V)
Drawing the add-to-cart timeline: Step 1 (V)
Asynchronous calls require new timelines (V)
Different languages, different threading models (V)
Building the timeline step-by-step (X)
Drawing the add-to-cart timeline: Step 2 (V)
Timeline diagrams capture the two kinds of sequential code (V)
Timeline diagrams capture the uncertain ordering of parallel code (X)
Principles of working with timelines (V)
JavaScript’s single-thread

## Introduction

This article describes

* Concept of timeline diagrams
  * Represent sequences of actions over time
  * Timeline diagrams help us understand how software runs
  * Example: distributed system, such as a web client talks to a web server
* How to draw timeline diagrams from code
* How to use them to diagnose and predict bugs

## Why?

By reducing the resources shared between timelines, we can improve code design and create more efficient programs.

## How?

Problem: Shopping cart showing the wrong total
  * Reproduce: Click `add 6` **twice** fast
  * Desired result: `14` (6 * 2 + 2, 2 shoes + shipping)
  * Variant results: `14, 16, 22`

### Draw timeline diagrams from code

#### code

```javascript
function add_item_to_cart(name, price, quantity) {
  cart = add_item(cart, name, price, quantity);
  calc_cart_total();
 }
  
function calc_cart_total() {
  total = 0;
  cost_ajax(cart, function(cost) { // AJAX request
    total += cost; // when request complete, add on cost
    shipping_ajax(cart, function(shipping) { // AJAX request
      total += shipping; // when request complete, add on shipping
      update_total_dom(total);
    });
  });
} 
```

#### timeline diagram, one request, browser

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_timeline_diagram.png' alt=''>

* Actions
  * `+=`:
  ```javascript
  var temp = total; // read
  temp = temp + 1;
  total = temp; // write
  ```
  * `console.log(total)`:
  ```javascript
  var temp = total; // read
  console.log(temp);
  ```
  * Refer to sections "Two tricky details about the order of actions" and "Drawing the add-to-cart timeline: Step 1"
* Interleave
  * synchronous actions don’t interleave
  <img src='{{site.baseurl}}/assets/img/synchronous_actions.png' class='w-1/2' alt=''>
  * Asynchronous actions can interleave
  <img src='{{site.baseurl}}/assets/img/asynchronous_actions.png' class='w-1/2 h-1/2' alt=''>
  * Refer to sections "Different languages, different threading models in grokking simplicity", "Timeline diagrams capture the two kinds of sequential code"
* Timelines (Three in the graph):
  * Same timeline: Actions occur in order
  * Separate timeline (Async): Actions happen at the same time or out of order
* dot line:
  * to be continued with JavaScript’s single-thread

### Read timeline diagrams to find bugs

#### timeline diagram, two request, browser

<img src='{{site.baseurl}}/assets/img/add_item_to_cart_two_timeline_diagram.png' alt=''>
* Problem: The shipping add twice

#### deal with timeline

* Principles:
  * Ordering
    * Evaluation: $$o = \frac{(ta)!}{(a!)^t}$$
    * Fewer timelines, $$t$$: merely impossible
    * Shorter timelines, $$a$$
  * Fewer sharing resources: reduce the ordering we need to consider
  * Coordinate when resources ares hared
  * Manipulate time as a first-class concept: in following chapters
* Refer to sections "The two fundamentals of timeline diagrams", "Asynchronous calls require new timelines", "Drawing the add-to-cart timeline: Step 2", "Principles of working with timelines"

### Improve code design by reducing resources shared between timelines.


## What?

list out the solution

## Reference

[grokking simplicity](https://grokkingsimplicity.com/)
