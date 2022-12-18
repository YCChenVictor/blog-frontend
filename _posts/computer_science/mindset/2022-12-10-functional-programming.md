---
layout: post
title:
description: ''
date: '2022-12-10'
categories: mindset
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

Functional Programming does everything with functions (input -> output). In this concept, we think more about steps than object interactions.

* pros
  * avoid side effect: only expected input and output will be created, so it won't affect other components
  * TBC
* cons

## Why?

TBC

## How?

### Concept of higher order function

higher order function will return a function; for example

```javascript
function baker(degree) {
  return function (food) {
    return food + ' baked in ' + degree;
  }
}

var baker_100 = baker(100);
baker_100('banana')
```

### do not iterate

Use map, reduce, filter instead. For example, we want to make a sandwich with ingredients, bread, tomato, onion, lettuce and we need to process them before making sandwich. With iteration, we can do

```javascript
var ingredients = ['bread', 'tomato', 'onion', 'lettuce']

for (let i = 0; i < ingredients.length; i++) {
  ingredients[i] = ingredients[i] + '_processed';
}

console.log(ingredients)
```

which the `ingredients` changed, causing side effect. Or we can achieve it with

```javascript
var ingredients = ['bread', 'tomato', 'onion', 'lettuce']

ingredientsProcessed = []
for (let i = 0; i < ingredients.length; i++) {
  ingredientsProcessed[i] = ingredients[i] + '_processed'
}

console.log(ingredientsProcessed)
console.log(ingredients)
```

tedious, and we can use map

```javascript
const ingredients = ['bread', 'tomato', 'onion', 'lettuce']
ingredientsProcessed = ingredients.map(x => x + '_processed')
```

### No mutability

Use immutable data, information in a database that cannot be deleted or modified, to avoid any side effect on other components. Actually, in section of [do not iterate](#do-not-iterate), we can see this philosophy.

### persistent data structure

As we can see, for immutability, as the project getting bigger, there must be lots of process to be redo for a tiny change. To avoid redundant process, we want to utilize the old data as much as possible and we can use tree structure or hash structure as follow:

TBC

## What?

give an example

## Reference

[Learning Functional Programming with JavaScript - Anjana Vakil - JSUnconf](https://www.youtube.com/watch?v=e-5obm1G_FY&t=142s)
