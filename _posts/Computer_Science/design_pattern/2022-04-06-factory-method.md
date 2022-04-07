---
layout: post
title: factory method
description: ''
date: '2022-04-06'
categories: design-pattern
note:
mathjax:
mermaid:
p5: true
---

## Introduction

Image that you have a factory and the product lines would be as follow:

<div id='concept' class='h-screen justify-center items-center'>
  <div id='concept toggle' class=''></div>
  <div id='concept canvas' class='border'></div>
</div>

<script>
  const imagePath = '/assets/img/factory_method_concept.png'
  const conceptDiv = document.getElementById('concept');
  const conceptWidth = conceptDiv.offsetWidth;
  let eraseEnable = false;
  let img;
  let photoGraph;

  function setup() {
    setupImage ()
    setupButton ()
    setupCanvas ()
    setupGraphics ()
  }

  function draw() {
    image(img, 0, 0, conceptWidth, 400);
    image(graphic, 0, 0)
  }

  function mouseDragged() {
    if (!eraseEnable) {
      graphic.fill('black');
      graphic.noStroke();
      graphic.ellipse(mouseX, mouseY, 5, 5);
    } else {
      graphic.fill('white');
      graphic.noStroke();
      graphic.ellipse(mouseX, mouseY, 10, 10);
    }
  }

  function keyTyped() {
    if (key === 's') {
      saveCanvas('decorator_concept.png');
    }
  }

  function setupImage () {
    try {
      img = loadImage(imagePath);
    }
    catch {
      img = createImage(conceptWidth, 400)
    }
  }

  function setupButton () {
    toggleButton = createButton('erase');
    toggleButton.parent('concept toggle');
    toggleButton.addClass("border rounded px-4");
    toggleButton.mouseClicked(ButtonClicked)
  }

  function setupCanvas () {
    const concept = createCanvas(conceptWidth, 400);
    concept.parent('concept canvas');
  }

  function setupGraphics () {
    graphic = createGraphics(conceptWidth, 400);
  }

  function ButtonClicked () {
    toggleStyle()
    toggleErase()
  }

  function toggleErase() {
    if (eraseEnable) {
      noErase();
      eraseEnable = false;
    }
    else {
      erase();
      eraseEnable = true;
    }
  }

  function toggleStyle() {
    toggleButton.toggleClass("bg-indigo-100");
    toggleButton.toggleClass("border");
  }
</script>

## Why?

Factory manufactures lots of products with some common characteristics. The factory method pattern demonstrates the way to create various classes with some common characteristics, meaning we do not need lots of class to create lots of objects with some common features.

## How?

focus on the mechanim

## What?

give an example

## Reference

[Factory Method Pattern – Design Patterns (ep 4)](https://www.youtube.com/watch?v=EcFVTgRHJLM&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=4)

[Factory Method in Ruby](https://refactoring.guru/design-patterns/factory-method/ruby/example#:~:text=Factory%20method%20is%20a%20creational,constructor%20call%20(%20new%20operator).)
