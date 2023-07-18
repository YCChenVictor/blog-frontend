---
layout: post
title: overview
description: ''
date: '2022-01-30'
categories: design-pattern
note:
publish: true
---

## Introduction

Before we get started, please understand [object-oriented programming]({{site.baseurl}}/concept/2021/11/21/Object-Oriented-Programming.html) first. Design pattern provides elegant solutions to **repeatable** problems. There are three categories:

* Creational patterns: different ways to create objects
* Structural patterns: the relationship between these objects
* Behavioral patterns: interaction or communication between these objects

## Why?

Design reusable and extensible object-oriented software.

## How?

Main 23 design patterns as follow:

* creational: factory method, builder, prototype, singleton, abstract method
* structural: composition, decorator, adapter, proxy, bridge, facade, flyweight
* behavioral: observer, template Method, strategy, interpreter, chain of Responsibility, command, iterator, mediator, memento, null Object, state, visitor

### comparison

* Creational design patterns try to create objects in a manner suitable for the situation
  * Factory Method provides a way to delegate the creation of objects to subclasses. It's useful when you want to create objects without specifying the exact class of object that will be created.
  * Builder separates the construction of a complex object from its representation, so that the same construction process can create different representations. It's useful when you want to create complex objects with many optional parameters.
  * Prototype involves creating new objects by cloning existing objects. It's useful when creating objects is expensive, and you want to reuse existing objects.
  * Singleton ensures that only one instance of a class can be created, and provides a global point of access to that instance. It's useful when you want to limit the number of instances of a class, or when you need to coordinate actions across the system.
  * Abstract Method: This pattern provides an interface for creating families of related objects, without specifying the concrete classes of those objects. It's useful when you want to create objects that share a common interface, but have different implementations.
* Structural design patterns deal with object composition and provide ways to organize objects to form larger structures
  * Composition: This pattern allows you to create hierarchical structures of objects by composing objects into tree structures. It's useful when you want to represent part-whole hierarchies.
  * Decorator: This pattern allows you to add behavior to objects dynamically by wrapping them in an object of a decorator class. It's useful when you want to add functionality to an object without changing its interface.
  * Adapter: This pattern allows you to adapt an object to another interface, without changing the underlying object. It's useful when you want to reuse existing code with a different interface.
  * Proxy: This pattern provides a surrogate or placeholder for another object to control access to it. It's useful when you want to add security, logging, or caching to an object.
  * Bridge: This pattern separates an object's interface from its implementation, so that the two can vary independently. It's useful when you want to decouple an abstraction from its implementation, allowing both to evolve independently.
  * Facade: This pattern provides a simplified interface to a complex subsystem of objects. It's useful when you want to provide a simple interface to a complex system.
  * Flyweight: This pattern allows you to share objects to reduce memory usage, by sharing common parts of state between objects. It's useful when you want to create many objects with similar state.
* Behavioral design patterns deal with communication between objects and how objects interact with each other
  * Observer: This pattern allows you to define a one-to-many dependency between objects, so that when one object changes state, all its dependents are notified and updated automatically. It's useful when you want to keep multiple objects in sync with each other.
  * Template Method: This pattern defines the skeleton of an algorithm in a base class, allowing subclasses to provide concrete implementations of certain steps. It's useful when you want to define the basic structure of an algorithm, while allowing certain steps to be customized.
  * Strategy: This pattern allows you to define a family of interchangeable algorithms, encapsulate each one, and make them interchangeable at runtime. It's useful when you want to choose an algorithm dynamically, based on runtime conditions.
  * Interpreter: This pattern provides a way to define the grammar of a language, and to interpret sentences in that language. It's useful

## What?

give general example to each pattern

### factory method

wait the other articles

### builder

### prototype

### singleton

### abstract method

## Reference

[Software design pattern](https://en.wikipedia.org/wiki/Software_design_pattern)

[Design Patterns in Plain English Mosh Hamedani](https://www.youtube.com/watch?v=NU_1StN5Tkk)
