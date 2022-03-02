---
layout: post
title: Object Oriented Porgramming
date: '2021-11-21'
categories: mindset
note: 我是覺得還是要用靜態的 OOP 語言來學
---

## Introduction

I am going to demonstrate the OOP concepts with ruby and maybe with JAVA.

The topics are as follow:

1. classes: object-oriented, 
2. coupling:
3. interfaces
4. encapsulation
5. abstraction
6. inheritnace
7. polymorphism: treating an object as a generic version of something; for example, car, truck, and bicycle are versions of vehicle.
8. UML

## Why

Because we can have deeper understanding in morden software design.

## How

### classes

We use class to create objects and the class will define the attributes and methods these objects have. For example, a `User` class in any SaaS product would be as follow:

```ruby
class MyClass
  def initialize
    # attributes
  end
  
  # methods
  def say_hello
    puts "Hello World"
  end
end

def another_hello
  puts "Hello World (from a method)"
end

c = MyClass.new
c.say_hello
another_hello
```

To create a user, we must give the user attributes, email and password and the can use defined methods ... to

### OOP in ruby

A pure object-oriented language -> Everything is an object -> Use `classes` as blueprint of an `object` -> two main properties: `attributes` for states and `methods` for behaviors. Some import concepts as follow:

#### Abstraction

Abstraction shows only essential attributes; for example, in this world, we must have method to distinguish human being; as a result, we must need a method such as `symbol` in the class of a human. Then, the code structure of human beings would be as follow:

```ruby
Class human
  def symbol
    raise NoMethodError, "you must give then symbol to recognize this human"
  end
end
```

and then we can create a class for a human with symbol

```ruby
Class human
  def symbol
    puts "tall, male, ...etc"
  end
end
```

if we did not create the class with `symbol` method, it will raise an error.

#### Encapsulation

The private methods are example of encapsulation in ruby. You cannot use the methods outside the class.

#### Public, Private, Protected

#### Polymorphism

skip

#### Inheritance

#### Modules

include modules in other class

#### Setter and Getter Methods

```ruby
class Human
  def initialize(name)
    @name = name
  end
end
```

If we want to get the name, we need a **getter method**, `name`

```ruby
class Human
  ...
  def name
    @name
  end
end

test = Human.new('test')
puts test.name
```

IF we want to change the name, we need a **setter method**, `name=`

```ruby
class Human
  ...
  def name= new_name
    @name = new_name
  end
end

test = Human.new('test')
test.name = 'test_new'
puts test.name
```

#### Super

Super calls a method on the **parent class** with the **same name**.

#### Self

Get the object that currently executes.

## What

### Reference

[The Basics of OOP Ruby](https://medium.com/launch-school/the-basics-of-oop-ruby-26eaa97d2e98)

[Ruby Tutorial: Abstract Classes](https://www.youtube.com/watch?v=28vDvuhHA9s)
