---
layout: post
title: factory method
description: ''
date: '2022-04-06'
categories: design-pattern
note:
mathjax:
mermaid: true
publish: true
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

The key concept lays on that factory determines which products to be produced on the product line, which means factory method design pattern determines which kind of object to be produced on compile time.

## Why?

Factory manufactures lots of products with some common characteristics. The factory method pattern demonstrates the way to create various classes with some common characteristics, meaning we do not need lots of class to create lots of objects with some common features.

## How?

For example, you are creating a game and there are various maps in the world. You can use the factory method pattern to create the monsters in the world with creation logic you want. If I want the maps all fill with various monster randomly, then the UML would be as follow:

<div class="mermaid">
  classDiagram
    Monster <-- MonsterHard : is a
    Monster <-- MonsterEasy : is a

    Monster : common_attributes
    Monster : common_methods()

    MonsterHard : some_hard_attributes
    MonsterHard : some_hard_method()
    MonsterEasy : some_easy_attributes
    MonsterEasy : some_easy_method()

    Creator <-- HardModeCreator : is a
    Creator <-- EasyModeCreator : is a

    Creator : factory_method()
    Creator : create()
    HardModeCreator : create_more_hard_monsters()
    EasyModeCreator : create_more_easy_monsters()
    HardModeCreator <-- MonsterHard : created_by
    EasyModeCreator <-- MonsterEasy : created_by
</div>

## What?

```ruby
class Creator
  def factory_method
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def create
    product = factory_method

    product.roar
  end
end

class HardModeCreator < Creator
  def factory_method
    MonsterHard.new
  end
end

class EasyModeCreator < Creator
  def factory_method
    MonsterEasy.new
  end
end

class Monster
  def roar
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

class MonsterHard
  def roar
    puts 'hard monster come!'
  end
end

class MonsterEasy
  def roar
    puts 'easy monster come!'
  end
end

def create_monster(factory)
  factory.create
end

create_monster(HardModeCreator.new)
create_monster(EasyModeCreator.new)
```

As you can see, all the monster creation use the method, `create_monster` and call different type of factory.

## Reference

[Factory Method Pattern – Design Patterns (ep 4)](https://www.youtube.com/watch?v=EcFVTgRHJLM&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=4)

[Factory Method in Ruby](https://refactoring.guru/design-patterns/factory-method/ruby/example#:~:text=Factory%20method%20is%20a%20creational,constructor%20call%20(%20new%20operator).)
