---
title: '(Ruby_2) Number, String, Array, Range, Hash, Symbol'
description: Number
date: '2021-02-12T12:03:35.917Z'
categories: []
keywords: []
slug: /@t5204713910/ruby-2-number-string-array-range-hash-symbol-169796c09def
---

### Number

In the world of Ruby, anything is an object. The classes of number: integer, float, rational

#### Integer

*   **class:**

open the irb

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__qSREyWwh2F__rdK__2FfGeMA.png)

The number 1 is an instance of the class of Integer

*   **Arithmetics of integers:**

If we use integers to do arithmetics, it returns integer; for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__HQy0M__U0NrAe4lRhrihHyA.png)

The output is 3. If we want to solve this problem, change an integer into float type.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Oql0cQpUGMT__ZoGRP13a6w.png)

The output is 3.33333333

### String

#### **string interpolation:**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__h__1sxr5VXhJ101Bqia6Syg.png)

The output: zzz, aaa, 18

#### number of words in sentence

$ words = "I like it"

$ puts words.split.count

#### Up Case, Down Case, Swap Case, capitalize, empty

$ puts "hello, ruby".upcase  # => HELLO, RUBY

$ puts "HELLO, RUBY".downcase # => hello, ruby

$ puts "Hello, Ruby".swapcase # => hELLO, rUBY

$ puts "eddie".capitalize # => Eddie

$ puts "".empty? # => true

#### Calculate the number of letter appearing in a string

words = "iiiiiiiijjjjjjjjAAAAAAAA"

$ puts words.count("i") # => 8

$ puts words.count("A-Z") # => 8

#### Whether the string start from a letter, end in a letter or include a letter

puts "Hello, Ruby".start\_with?("H") # => true

puts "Hello, Ruby".end\_with?("y") # => true

puts "Hello, Ruby".include?("R") # => true

#### Change a word to another word in string

puts "PHP is good".sub(/PHP/, "Ruby")

#=> Ruby is good

### Array

#### construction

**first method:**

p Array.new(2, "Ruby") # => \["Ruby", "Ruby"\]

**second method:**

list = \["Ruby", "Ruby"\]

#### element acquiring

list = \["a", "b", "c"\]

p list\[0\] # => a  
p list.second = # => b

### Range

#### construction

There are two method

1\. (1..5).to\_a # => \[1, 2, 3, 4, 5\]  
2\. (1...5).to\_a # => \[1, 2, 3, 4\]  
3\. \[\*1..5\] # => \[1, 2, 3, 4, 5\]

#### string range

('a'..'z').to\_a # => \['a', 'b', ..., 'z'\]  
('A'..'Z').to\_a # => \['A', 'B', ..., 'Z'\]

### Hash

#### construction

**first method:**

old\_hash = {:title => "Ruby", :price => 350}

**second method:**

new\_hash = {title: "Ruby", price: 350}

#### item extracting with key

test = {name: "name"}  
puts test\["name"\] # nothing happened  
puts test\[:name\] # => name

#### print out keys

profile = {name: "name", age: 11}  
p profile.keys # => \[:name, :age\]

#### print out items

test = {name: "name", age: 11}  
puts test.values # => name, 11

### Symbol

#### Form

It is “:” concatenate with a string; for example, :name, :user …etc

#### meaning

It is an instance of class, Symbol and it is an object with name. That is, if we want to create an object to represent a specific status, we can use symbol.

#### The difference between symbol and variable

**symbol can exist independently**

variable is an object point to a string; for example, the variable, greeting points to a string, “Hello Ruby”. The variable, greeting cannot existed without “Hello Ruby” being pointed to.

greeting = "Hello Ruby"

However, symbol is an object which can exist independently.

**the content of symbol can be changed**

"hello"\[0\] = "k"  
:hello\[0\] = "k" # => print out error

**the efficiency of symbol is better**

In Ruby, a new string will cost a new memory but a new symbol always cost one position of memory.

**the comparison of symbol is faster than string**

**symbol and string can be converted into each other**

"name".to\_sym # => :name  
:name.to\_s # => "name"