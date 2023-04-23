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
* ORM works by mapping database tables to objects. Object-Relational Mapping: ORM is a technique that maps database tables to classes, and vice versa, so that developers can work with the database using object-oriented programming.

## Why

## How

Models: In ORM, models are classes that represent database tables. They define the structure and behavior of the data in the table, and the relationships between tables.

Fields: Fields are attributes of a model that represent the columns in the corresponding database table. Each field has a data type and a set of constraints that determine how data is stored and validated.

Relationships: Relationships define how models are related to each other in the database. There are several types of relationships, such as one-to-one, one-to-many, and many-to-many.

Querysets: Querysets are objects that represent a collection of model objects that match a certain query. Querysets allow developers to retrieve, filter, and sort data from the database using object-oriented syntax.

Transactions: Transactions are a way to group multiple database operations into a single atomic operation. Transactions ensure that either all operations succeed, or none of them do.

Migrations: Migrations are a way to manage changes to the database schema over time. Migrations allow developers to add, remove, or modify database tables and fields while preserving the data in the database.

These are just some of the key concepts in ORM. There are many more advanced concepts and techniques in ORM, but understanding these fundamentals is a good starting point.

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
