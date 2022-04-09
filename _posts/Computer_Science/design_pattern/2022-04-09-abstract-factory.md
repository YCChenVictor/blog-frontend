---
layout: post
title: absctact factory
description: ''
date: '2022-04-09'
categories: design-pattern
note:
mathjax:
mermaid:
p5:
---

## Introduction & Why

Given that we know the factory method, the factory method can create same kind of monster with different level. That is, we call the factory to use its product line to create **same** kind of product but choose **different** feature during the process of production. What if we want the factory to create various product? We need the factroy to have various product lines.

The result would be as follow:

```ruby
def create_monsters(factory)
  monster_a = factory.create_monster_a
  monster_b = factory.create_monster_b
end
```

## How?

Let's say we want three methods for three environments:

1. ocean, hard mode
2. plain, easy mode
3. dessert, hard mode

so the methods to create the monsters accroding to the envrionmnets would be as follow:

```ruby
def create_monsters_hard_mode_ocean()
end

def create_monsters_easy_mode_plain()
end

def create_monsters_hard_mode_dessert()
end
```

and the UML would be as follow:



## What?

give an example

## Reference
