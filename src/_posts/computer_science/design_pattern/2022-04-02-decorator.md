---
layout: post
title: decorator
description: ''
date: '2022-04-02'
categories: design-pattern
note: 圖片存錯了，要再畫一次
mathjax:
mermaid: true
p5: true
publish: true
---

## Introduction

To change the behavior of a class without rewriting the code of the class by wrap the class with a class.

<div id='concept' class='h-screen justify-center items-center'>
  <div id='concept toggle' class=''></div>
  <div id='concept canvas' class='border'></div>
</div>

<script>
  const imagePath = '/assets/img/decorator_concept.png'
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

Image your resturant serves lots of beverages and you want to design tables to store necessary information in your computer. Intuitively, there are two way: using inheritance or using polymorphism; however, inheritance creates lots of tables with duplicate methods and polymorphism creates multiple columns which is unnecessary for most other tables. To solve it, we use the concept of decorator which is to decorate the base class.

## How?

The UML:

<div class="mermaid">
classDiagram
  Beverage <-- Espresso : is a
  Beverage <-- Decaf : is a
  Beverage <-- Decorator : is a & has a
  Decorator <-- SoyMilkDecorator : is a
  Decorator <-- CaramelDecorator : is a

  Beverage : getDesc()
  Beverage : cost()

  Espresso : cost()
  Decaf : cost()

  Decorator : getDesc()
  SoyMilkDecorator : getDesc()
  SoyMilkDecorator : cost()
  CaramelDecorator : getDesc()
  CaramelDecorator : cost()
</div>

For example, the cost of Espresso is 2 dollar and the cost of SoyMilkDecorator is 1 dollar, so I would expect that `espresso.cost = 2`, `SoyMilkDecorator.cost = 1`, `espresso_with_soymilk.cost = 3`

## What?

```ruby
class Beverage
  def get_desc
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def cost
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

class Espresso < Beverage
  def get_desc
    'Espresso'
  end

  def cost
    2
  end
end

class Decaf < Beverage
  def get_desc
    'Decaf'
  end

  def cost
    1
  end
end

class Decorator < Beverage
  attr_accessor :beverage

  def initialize(beverage)
    @beverage = beverage
  end

  def get_desc
    @beverage.get_desc
  end
end

class SoyMilkDecorator < Decorator
  def cost
    @beverage.cost + 1
  end
end

class CaramelDecorator < Decorator
  def cost
    @beverage.cost + 3
  end
end

espresso_with_soy_milk = SoyMilkDecorator.new(Espresso.new)
puts espresso_with_soy_milk.cost # 3
```

## Reference

[Decorator Pattern – Design Patterns (ep 3)](https://www.youtube.com/watch?v=GCraGHx6gso&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=3)

[Decorator in Ruby](https://refactoring.guru/design-patterns/decorator/ruby/example)
