---
layout: post
title: decorator
description: ''
date: '2022-04-02'
categories: design-pattern
note:
usemathjax:
mermaid:
draw: true
---

## Introduction

To change the behavior of a class without rewriting the code of the class by wrap the class with a class.

<div id='concept' class='flex h-screen justify-center items-center'></div>

<script>
  function setup() {
    const concept = createCanvas();

    concept.parent('concept');
  }

  function draw() {
    if (mouseIsPressed === true) {
      ellipse(mouseX, mouseY, 5, 5);
    }
  }
</script>

## Why?

focus on why we need it

## How?

focus on the mechanim

## What?

give an example

## Reference

[Decorator Pattern – Design Patterns (ep 3)](https://www.youtube.com/watch?v=GCraGHx6gso&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=3)
