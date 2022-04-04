---
layout: post
title: decorator
description: ''
date: '2022-04-02'
categories: design-pattern
note:
mathjax:
mermaid:
p5: true
---

## Introduction

To change the behavior of a class without rewriting the code of the class by wrap the class with a class.

<div id='concept' class='h-screen justify-center items-center'>
  <div id='concept toggle' class=''></div>
  <div id='concept canvas' class='border'></div>
</div>

<script>
  const imagePath = '../../../../../assets/img/decorator_concept.jpg'
  let eraseEnable = false;
  let img;

  function preload() {
    img = loadImage(imagePath);
  }

  function setup() {
    image(img, 0, 0);
    const conceptDiv = document.getElementById('concept');
    const width = conceptDiv.offsetWidth;
    const toggleBtn = createButton('toggle erase');

    toggleBtn.parent('concept toggle');
    toggleBtn.mouseClicked(toggleErase);

    const concept = createCanvas(width, 400);
    concept.parent('concept canvas');
  }

  function toggleErase() {
    console.log(eraseEnable)
    if (eraseEnable) {
      noErase();
      eraseEnable = false;
    }
    else {
      erase();
      eraseEnable = true;
    }
  }

  function draw() {
    if (mouseIsPressed) {
      if (!eraseEnable) {
        fill('black');
        noStroke();
        ellipse(mouseX, mouseY, 5, 5);
      } else {
        ellipse(mouseX, mouseY, 10, 10);
      }
    }
  }

  function keyTyped() {
    if (key === 's') {
      console.log('save the drawing')
      img.save('decorator_concept.jpg');
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
