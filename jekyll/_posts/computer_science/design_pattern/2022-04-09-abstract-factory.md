---
layout: post
title: absctact factory
description: ''
date: '2022-04-09'
categories: design-pattern
note:
mathjax:
mermaid: true
p5:
publish: true
---

## Introduction & Why

Given that we know the factory method, which can create same kind of monster with different level. That is, we call the factory to use its product line to create **same** kind of product but choose **different** feature during the process of production. What if we want the factory to create various product? We need the factroy to have various product lines.

The result would be as follow:

```ruby
def create_monsters(factory)
  monster_a = factory.create_monster_a
  monster_b = factory.create_monster_b
end
```

Note that here only two monster using one factory, meaning each factory has its own  two product lines for these two monsters. We can do more complex design such as two factory using same product line for monster_a. But I am going to just demo it with two product line in each factory.

## How?

Let's say we want two methods for three environments:

1. ocean
2. plain

and there are two types of monsters: horse & fish. The horse monster is strong in plain but weak in ocean; the fish monster is strong in ocean but weak in plain. We need two factories for two environments. Each has two product lines.

so the methods to create the monsters accroding to the envrionmnets would be as follow:

```ruby
def create_monsters(FactoryOcean.new)
end

def create_monsters(FactoryPlain.new)
end
```

and the UML would be as follow:

<div class="mermaid">
  classDiagram
    Fish <-- StrongFish : is a
    Fish <-- WeakFish : is a

    Horse <-- StrongHorse : is a
    Horse <-- WeakHorse : is a

    AbstractFactory <-- FactoryOcean : is a
    AbstractFactory <-- FactoryPlain : is a

    FactoryOcean : create_strong_fish()
    FactoryOcean : create_weak_horse()
    FactoryPlain : create_weak_fish()
    FactoryPlain : create_strong_horse()

    StrongFish <-- FactoryOcean : create
    WeakFish <-- FactoryPlain : create

    WeakHorse <-- FactoryOcean : create
    StrongHorse <-- FactoryPlain : create
</div>

## What?

```ruby
class AbstractFactory
  def create_fish
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end

  def create_horse
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

class FactoryOcean < AbstractFactory
  def create_fish
    StrongFish.new
  end

  def create_horse
    WeakFish.new
  end
end

class FactoryPlain < AbstractFactory
  def create_fish
    WeakFish.new
  end

  def create_horse
    StrongHorse.new
  end
end

class Fish
  def power
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

class StrongFish < Fish
  def power
    'strong fish'
  end
end

class WeakFish < Fish
  def power
    'weak fish'
  end
end

class Horse
  def power
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end

class StrongHorse < Horse
  def power
    'strong horse'
  end
end

class WeakHorse < Horse
  def power
    'weak horse'
  end
end

def create_monsters(factory)
  fish = factory.create_fish
  horse = factory.create_horse

  puts fish.power
  puts horse.power
end

create_monsters(FactoryOcean.new)
create_monsters(FactoryPlain.new)
```

## Reference

[Abstract Factory Pattern – Design Patterns (ep 5)](https://www.youtube.com/watch?v=v-GiuMmsXj4&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=5)
