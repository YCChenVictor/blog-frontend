---
layout: post
title:
description: ''
date: '2022-01-13'
categories: rails
note:
publish: true
---

## Introduction

* ORM is based on [OOP concepts]({{site.baseurl}}/concept/2021/11/21/Object-Oriented-Programming.html). Some important concepts to learn include classes, objects, inheritance, polymorphism, and encapsulation
* ORM works by mapping database tables to objects

## Why

## How

### CRUD

To create a candidate

```ruby
user = Candidate.new(name: "aaa", age: 19)  
user.save
```

means in SQL,

```SQL
TBC
```

To read all users,

```ruby
User.all
```

means in SQL,

```SQL
SELECT * FROM users;
```

To find all table names

```ruby
ActiveRecord::Base.connection.tables
```

means in SQL,

```SQL
TBC
```

To update the candidate’s name with id = 1,

```ruby
candidate = Candidate.find_by(id: 1)  
candidate.name = "hahaha"  
candidate.save

# SQL
```

or

```ruby
candidate.update(name: "hahahaha", age: 20)

# SQL
```

To delete candidate with id = 1,

```ruby
Candidate.destroy(1)
```

means in SQL

```SQL
TBC
```

Notice! `delete` will call the SQL delete directly, so no callbacks during deleting process. By ignoring callback and relation, `delete` is faster than `destroy`.

### optimization

#### eager loading

#### lazy loading

#### caching

#### transactions

## what

Give a real world example
