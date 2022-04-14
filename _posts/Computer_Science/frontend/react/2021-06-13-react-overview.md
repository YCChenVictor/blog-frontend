---
layout: post
title: overview (react)
description: ''
date: '2021-06-13'
categories: react
note: tutorial 的問題是 component 還是用 class form， CSS 還是用 bootstrap
mathjax:
mermaid: true
p5:
---

## Introduction

I am going to follow the tutorial to build a website with react and use it as a benchmark for other deeper topics in react.

1. tree
2. component
3. hello world
4. third party library
5. basic commands

## Why?

I want to build a world based on JS frontend

## How?

### tree

For example, the website as follow:

<img src="/assets/img/react_basic_layout_what.png" alt="react_basic_layout_what">

Then the tree of this website:

<div class="mermaid">
graph TB
  id1((App)) --> id2((navbar))
  id1((App)) --> id3((sidebar))
  id1((App)) --> id4((main))
  id4((main)) --> id5((card))
  id4((main)) --> id6((card))
  id4((main)) --> id7((...))
</div>

all the nodes represent a component

### component

A component is composed by `state` and `render()`

1. The data to be displayed when rendering is in state
2. render method describe what the UI should look like when rendering

```javascript
class Card {
  state = {};

  render() {
    
  }
}
```

The `render()` method returns **react elements**, virtual DOM, which are JS objects in memory map to real DOM element. When a state changes, react change the virtual DOM first and then change the state of real DOM, making it just like JQuery with AJAX.

### hello world

remove all the files in `/src` and add `index.js` with following code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>Hello World</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

which will create a JS object and render it into the DOM with id = root in the `public/index.html`

### third party library

just install it with `npm install xxx` and follow the official guides.

* [install tailwind](https://tailwindcss.com/docs/guides/create-react-app)

### basic commands

1. run project: `npm start`

## Reference

[React JS - React Tutorial for Beginners](https://www.youtube.com/watch?v=Ke90Tje7VS0)
