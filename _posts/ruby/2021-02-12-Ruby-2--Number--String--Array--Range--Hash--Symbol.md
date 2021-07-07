---
layout: post
title: (Ruby 2) Data Type
date: '2021-02-12T12:03:35.917Z'
categories: ruby
note: none
---

## Number (1)

In the world of Ruby, anything is object. The classes of number: integer, float, rational

### Integer

#### class:

open the irb
<img src="/assets/img/1__qSREyWwh2F__rdK__2FfGeMA.png" alt="">

The number 1 is an instance of the class of Integer

#### Arithmetics of integers:

If we use integers to do arithmetics, it returns integer; for example,

```
puts 10/3
```

The output is 3. If we want to solve this problem, change an integer into float type:
```
puts 10/3.0
```

The output is 3.33333333

### float (skip)

### rational

#### class:

open the irb
<img src="/assets/img/rational_example.png" alt="">

## String (2)

### string interpolation:
<img src="/assets/img/1__h__1sxr5VXhJ101Bqia6Syg.png" alt="">

The output:
```
zzz, aaa, 18
```

### number of words in sentence
In irb,
```
$ words = "I like it"
$ p words.split.count
```
The result:

<img src="/assets/img/result_of_num_of_words.png" alt="">

### Up Case, Down Case, Swap Case, capitalize, empty
```
$ puts "hello, ruby".upcase  # => HELLO, RUBY

$ puts "HELLO, RUBY".downcase # => hello, ruby

$ puts "Hello, Ruby".swapcase # => hELLO, rUBY

$ puts "eddie".capitalize # => Eddie

$ puts "".empty? # => true
```
### Calculate the number of letter appearing in a string
```
words = "iiiiiiiijjjjjjjjAAAAAAAA"

$ puts words.count("i") # => 8

$ puts words.count("A-Z") # => 8
```
### Whether the string start from a letter, end in a letter or include a letter
```
puts "Hello, Ruby".start_with?("H") # => true

puts "Hello, Ruby".end_with?("y") # => true

puts "Hello, Ruby".include?("R") # => true
```
### Change a word to another word in string

puts "PHP is good".sub(/PHP/, "Ruby")

#=> Ruby is good

## Array (3)

### construction

**first method:**

p Array.new(2, "Ruby") # => ["Ruby", "Ruby"]

**second method:**

list = ["Ruby", "Ruby"]

### element acquiring

list = ["a", "b", "c"]

p list[0] # => a  
p list.second = # => b

## Range (4)

### construction

There are two method

1. (1..5).to_a # => [1, 2, 3, 4, 5]  
2. (1...5).to_a # => [1, 2, 3, 4]  
3. [*1..5] # => [1, 2, 3, 4, 5]

### string range

('a'..'z').to_a # => ['a', 'b', ..., 'z']  
('A'..'Z').to_a # => ['A', 'B', ..., 'Z']

## Hash (5)

### construction

**first method:**

old_hash = {:title => "Ruby", :price => 350}

**second method:**

new_hash = {title: "Ruby", price: 350}

### item extracting with key

test = {name: "name"}  
puts test["name"] # nothing happened  
puts test[:name] # => name

### print out keys

profile = {name: "name", age: 11}  
p profile.keys # => [:name, :age]

### print out items

test = {name: "name", age: 11}  
puts test.values # => name, 11

## Symbol (6)

### Form

It is “:” concatenate with a string; for example, :name, :user …etc

### meaning

It is an instance of class, Symbol and it is an object with name. That is, if we want to create an object to represent a specific status, we can use symbol.

### The difference between symbol and variable

**symbol can exist independently**

variable is an object point to a string; for example, the variable, greeting points to a string, “Hello Ruby”. The variable, greeting cannot existed without “Hello Ruby” being pointed to.

greeting = "Hello Ruby"

However, symbol is an object which can exist independently.

**the content of symbol can be changed**

"hello"[0] = "k"  
:hello[0] = "k" # => print out error

**the efficiency of symbol is better**

In Ruby, a new string will cost a new memory but a new symbol always cost one position of memory.

**the comparison of symbol is faster than string**

**symbol and string can be converted into each other**

"name".to_sym # => :name  
:name.to_s # => "name"

## True, False, and Nil (7)
1. no Boolean class in Ruby. Only TrueClass, FalseClass
2. true, false, and nil are singleton instances of TrueClass, FalseClass, and NilClass
3. The superclass of TrueClass, FalseClass, and NilClass is Object
4. When requiring Boolean value, nil behaves like false, and any value other than nil or false behaves like true

## reference
[**rational**](https://ruby-doc.org/core-2.5.0/Rational.html)

[**true, false, nil**](https://www.oreilly.com/library/view/the-ruby-programming/9780596516178/ch03s07.html#:~:text=true%20and%20false%20are%20the,a%20singleton%20instance%20of%20TrueClass%20.)
