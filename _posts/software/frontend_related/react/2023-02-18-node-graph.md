---
layout: post
title:
description: ''
date: '2023-02-18'
categories: react
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes how to draw node based force graph in react.

## Why?

I want to create node plot in my blog.

## How?

### init

* install
  ```bash
  npm install react-force-graph-2d
  ```

* Basic example
  ```javascript
  import { ForceGraph2D } from 'react-force-graph-2d';
  
  const nodes = [
    { id: 1, name: 'Node 1' },
    { id: 2, name: 'Node 2' },
    { id: 3, name: 'Node 3' }
  ];
  
  const links = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 1 }
  ];
  
  <ForceGraph2D
    graphData={{ nodes, links }}
    nodeLabel="name"
  />
  ```

## What?

* real world example: [graph]({{site.baseurl}}/graph)
* code:
  ```javascript
  ```

## Reference

[force-directed-clusters-with-links-between-clusters-forked](https://codesandbox.io/s/force-directed-clusters-with-links-between-clusters-forked-tsbf3b?file=/src/index.js:0-4553)
