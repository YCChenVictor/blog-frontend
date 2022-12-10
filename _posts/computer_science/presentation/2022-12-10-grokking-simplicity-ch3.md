---
layout: post
title:
description: ''
date: '2022-12-10'
categories: presentation
note: TODO, remove the images from textbook
mathjax:
mermaid: true
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Let's first distinguish actions, calculations, and data with example: grocery shopping

from

<img src="/assets/img/grocery_shopping_actions.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

to

<img src="/assets/img/grocery_shopping_ACD.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

* Why `decide shopping list` is calculation rather than action
  * because there is no side effect produced by it
  * side effect: change the attributes of original components
  * `decide shopping list` did not change the location of this person, the inventories in fridge, ...ect

## Why?

With ACD process, we can make sure we can truly solve a problem with perfect functional programming and then utilize the advantages of it such as parallel computing.

## How?

In the functional programming world, we solve a problem with concept of **input** and **output** while **minimizing the side effect** outside each function. To achieve it, following steps (ACD):

1. (action) decompose a problem with flow of actions to define the desired input and desired output of each action
2. (data) find the data needed in each action to define immutable datasets
3. (calculation) with immutable dataset and desired input, define required calculations

Take the example in [introduction](#introduction) section as example,

* we decompose the process into `check fridge`, `drive to store`, ...etc
* the input and output of `check fridge`
  * input: `true` (whatever reason such as cooking, hungry, ...etc)
  * output: `inventory in fridge`
* the input and output of `drive to store`
  * input: `inventory to buy`
  * output: `locations`

between actions, `check fridge` and `drive to store`, the desired input of `drive to store` is `inventory to buy`. However, the output of `check fridge` is `inventory in fridge`. As a result, there must be a calculation, `compare inventory we need and inventory in fridge`, here and we can get `inventory to buy`.

## What?

### new code

Example: CouponDog, a company sending coupons via email, want to have a new feature to send better coupon to customers recommending more other customers. Let's walk through this problem without any concept of programming and we will

1. get list of customers and coupons and the location of this data will change
2. mark customers with > 10 recommendations
3. mark coupons with better
4. send email and the status of these customers will change

Actually, the marking processes may be calculations rather than actions if we did not add attributes (marks) to these data, causing no side effect. Accordingly, we have

<img src="/assets/img/CouponDog_ACD.png" alt="">
<em>source: [grokking simplicity](https://grokkingsimplicity.com/)</em>

Now, based on above information, we can start to program it

```javascript
```

### existing code

## Reference

grokking simplicity
