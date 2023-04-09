---
layout: post
title:
description: ''
date: '2023-04-08'
categories: functional-programming
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

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
  * Desired result: `14`
  * Variant results: `14, 16, 22`

### Draw timeline diagrams from code

* code:
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
* diagram
  <img src="{{site.baseurl}}/assets/img/grocery_shopping_actions.png" alt="">  <em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

### Read timeline diagrams to find bugs
### Improve code design by reducing resources shared between timelines.

## What?

list out the solution

## Reference

Why: asking for the reason or purpose behind something.
How: asking for the method or process of doing something.
What: asking for information about a specific thing or object.
