---
layout: post
title: object oriented programming
date: '2021-11-21'
categories: mindset
note:
usemathjax: true
---

## Introduction

I am going to demonstrate the OOP concepts with ruby.

1. classes: object-oriented style to create objects with these classes
2. coupling & cohesion: in OOP, we want low coupling and high cohesion
3. polymorphism: treating an object as a generic version of something; for example, car, truck, and bicycle are versions of vehicle.
4. encapsulation:
5. abstraction
6. inheritnace
7. interfaces: with this concept,
8. UML

## Why

Because we can have deeper understanding in morden software design.

## How & What

### classes

We use class to create objects and the class will define the attributes and methods these objects have. For example, a `User` class in any SaaS product would be as follow:

```ruby
class User
  def initialize(name)
    # attributes
    @name = name
  end
  
  # methods
  def say_hello
    puts "Hello, my name is " + @name
  end
end

user = User.new('name')
user.say_hello
user.name
```

### coupling & cohesion

We want less coupling and high cohesion

#### concept

If this class is a machine in a company, we want it to be as independent as possible so that once it needs to be replace or suspended for some reason, we can easily do it, increasing the maintainability of this company.

So anything making this machine to be related to other components of this company will increase coupling.

#### math

$$Coupling(C) = 1 - 1/(d_o + d_i + 2 * (c_o + c_i) + g_d + 2 * g_c + w + r)$$

1. $$d_o$$ = number of output data parameters
2. $$d_i$$ = number of input data parameters
3. $$c_o$$ = number of output control parameters
4. $$c_i$$ = number of input control parameters
5. $$g_d$$ = number of global variables used as data
6. $$g_c$$ = number of global variables used as control
7. $$w$$ = number of modules called (fan-out)
8. $$r$$ = number of modules calling the module under consideration (fan-in)

#### how to decrease coupling

skip (to be continued)

### Abstraction

Abstraction shows only **essential** attributes; for example, in this world, there are lots of animals such as human, pig, ...etc and there are some identical characteristics, then we can first define a class, `Animal` and then subdivide it with inheritance rather than writing both classes having the same characteristics.

```ruby
class Animal
  def initialize
  end

  def eat
  end
end

class Human < Animal
  def speak
  end
end

class Pig
end
```

rather than

```ruby
class Human < Animal
  def initialize
  end

  def eat
  end

  def speak
  end
end

class Pig
  def initialize
  end

  def eat
  end
end
```

### Encapsulation

The private methods are example of encapsulation in ruby. You cannot use the methods outside the class. We only show the meaningful methods for outsiders.

### Interfaces

An interface implements Abstraction and Encapsulation throughly, making we only can see the appearance of this function and really easy to use; for example, we know the light can be on by switching the button but we do not the logics behind it.

### Inheritance

For example, For example, I want to create Animals: Dog, Cat, Bird.

```ruby
```

### Polymorphism

For example, I want to create Animals: Dog, Cat, Bird I can write a polymorphic class as follow:

```ruby
class Animal
  DOG = 0
  CAT = 1
  BIRD = 2

  attr_accessor :type

  def initialize(type)
    @type = type
  end
  
  def speak(words)
    puts words
  end
end

animals = [Animal.new(Animal.DOG), Animal.new(Animal.CAT), Animal.new(Animal.BIRD)]

animals.each |animal| do
  case animal.type
  when Animal.DOG
    animal.speak('bark')
  when Animal.CAT
    animal.speak('meow')
  when Animal.BIRD
    animal.speak('tweet')
  end
end
```

### polymorphism vs inheritance

polymorphism 沒有每一個 type 都創一個新的 class，inheritance 有。Cat, Dog, ...etc 都可以繼承自 Animal，也可以透過 loop 用 polymoprhism 創立

### Modules

include modules in other class

### Setter and Getter Methods

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

### Super

Super calls a method on the **parent class** with the **same name**.

### Self

Get the object that currently executes.

### Reference

[The Basics of OOP Ruby](https://medium.com/launch-school/the-basics-of-oop-ruby-26eaa97d2e98)

[Ruby Tutorial: Abstract Classes](https://www.youtube.com/watch?v=28vDvuhHA9s)

[Coupling (computer programming)](https://en.wikipedia.org/wiki/Coupling_(computer_programming)#:~:text=In%20software%20engineering%2C%20coupling%20is,of%20the%20relationships%20between%20modules.)

[What is the definition of "interface" in object oriented programming](https://stackoverflow.com/questions/2866987/what-is-the-definition-of-interface-in-object-oriented-programming)

[4.7: Introduction to Polymorphism - The Nature of Code](https://www.youtube.com/watch?v=qqYOYIVrso0)
