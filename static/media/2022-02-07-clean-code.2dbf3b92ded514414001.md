---
layout: post
title: basic concept on clean code
description: ''
date: '2022-02-07'
categories: mindset
note: 把一整個 chapter 念完，再來寫例子。如果之後文章太大，可以分拆出去。要假設讀者是第一次看這篇文章，所以從最簡單到最難的概念都要涵蓋。（讀者就是未來的我）
mermaid:
---

## Introduction

Hard work then get clean code.

* compose code to do 'one thing' well
  * as little dependent variable as possible
  * use data structure
* decompose code into multiple block of codes
  * modulize
* write code with tests
  * think of any edge case
  * error checking
* build Expressiveness: good naming, good structure ... etc
* avoid duplication
* evaluate code with correct, efficient, simple, readable, maintainable

## Why?

Be better programmer -> Changes happens all the time -> software out of date all the time -> In software, 80% maintenance -> making software always ready to be repaired -> we need readable, easy to be re-do or refactor -> clean code -> write it with craftsmanship -> detailed, on our time

## How?

### Naming

1. Use Intention-Revealing Names
2. Avoid Disinformation
3. Make Meaningful Distinctions

### xxx

## What?

### Naming

Take feature, `bulk archive` as example. The user should archive students through filter or csv.

#### Use Intention-Revealing Names

Original code:
```ruby

```

### write code with test

We should write down all the possible cases in our test.

## Reference

clean code by Robert Cecil Martin
