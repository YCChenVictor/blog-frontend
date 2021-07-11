---
layout: post
title: (Rails) Active Record
date: '2021-06-10'
categories: rails
note: to be continued
---

### Introduction
Active Record: The layer responsible for business data and logic and the model in MVC structure. In a business, the persistent process of data usage and creation requires a way to connect to database persistently, so called **Active Record**.

1. Table map to classes
2. Rows map to objects
3. Columns map to object attributes

### Why

There are lots of database management system such as MySQL, SQLite, and PostgreSQL with different syntax, so ORM (object-relational mapping) born to help us for using same syntax for same purpose on different databases.

**Active Record** pattern is a solution for ORM. With this pattern, we can access all data from table, User, with unified way:
```
User.all
```
rather than
```
SELECT * FROM User
```
and also avoid different syntax problem on different database language.

### How

A table in a database maps a class in programming language. An object instance in programming language maps a single row of table and the column data in each single row serves as an attribute of the instance.

#### CRUD
Basic CRUD can be refered to [**Active Record - Ruby on Rails**](https://guides.rubyonrails.org/active_record_basics.html)
  
#### Validation
For data to be consistent in a model, we should validate it before writing into a database. The methods for validation in [**Active Record Validation - Ruby on Rails**](https://guides.rubyonrails.org/active_record_validations.html)

I did not elaborate it because it just some basic operations.

#### Callbacks
The life cycle of an object in a framework always plays key role. The process:
<img src="/assets/img/active_record_callbacks.png" alt="">(reference: [**railsbook.pdf**](https://railsbook.tw/))

The above cycle only shows the hooks of save. For more information, please refer to [**active record callbacks**](https://guides.rubyonrails.org/active_record_callbacks.html)

#### Query
For more information, please refer to [**active record queries**](https://guides.rubyonrails.org/active_record_querying.html).

Some interesting queries: (I cannot understand it right now)

**Iteration**: If we want to send an email to all users
```
Customer.all.each do |customer|
  NewsMailer.weekly(customer).deliver_now
end
```
However, the `.all` takes too much memory; as a result, we can use `find_each`
```
Customer.find_each(batch_size: 5000) do |customer|
  NewsMailer.weekly(customer).deliver_now
end
```
to portion the table and read it in a batch size many times.

The source code of `find_each`:
```
def find_each(start: nil, finish: nil, batch_size: 1000, error_on_ignore: nil, order: :asc)
  if block_given?
    find_in_batches(start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do |records|
      records.each { |record| yield record }
    end
  else
    enum_for(:find_each, start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do
      relation = self
      apply_limits(relation, start, finish, order).size
    end
  end
end
```
The source code of `find_in_batches`:
```
def find_in_batches(start: nil, finish: nil, batch_size: 1000, error_on_ignore: nil, order: :asc)
  relation = self
  unless block_given?
    return to_enum(:find_in_batches, start: start, finish: finish, batch_size: batch_size, error_on_ignore: error_on_ignore, order: order) do
      total = apply_limits(relation, start, finish, order).size
      (total - 1).div(batch_size) + 1
    end
  end

  in_batches(of: batch_size, start: start, finish: finish, load: true, error_on_ignore: error_on_ignore, order: order) do |batch|
    yield batch.to_a
  end
end
```
The source code of `in_batches`:
```
def in_batches(of: 1000, start: nil, finish: nil, load: false, error_on_ignore: nil, order: :asc)
  relation = self
  unless block_given?
    return BatchEnumerator.new(of: of, start: start, finish: finish, relation: self)
  end

  unless [:asc, :desc].include?(order)
    raise ArgumentError, ":order must be :asc or :desc, got #{order.inspect}"
  end

  if arel.orders.present?
    act_on_ignored_order(error_on_ignore)
  end

  batch_limit = of
  if limit_value
    remaining   = limit_value
    batch_limit = remaining if remaining < batch_limit
  end

  relation = relation.reorder(batch_order(order)).limit(batch_limit)
  relation = apply_limits(relation, start, finish, order)
  relation.skip_query_cache! # Retaining the results in the query cache would undermine the poinof batching
  batch_relation = relation

  loop do
    if load
      records = batch_relation.records
      ids = records.map(&:id)
      yielded_relation = where(primary_key => ids)
      yielded_relation.load_records(records)
    else
      ids = batch_relation.pluck(primary_key)
      yielded_relation = where(primary_key => ids)
    end

    break if ids.empty?

    primary_key_offset = ids.last
    raise ArgumentError.new("Primary key not included in the custom select clause") unlesprimary_key_offset

    yield yielded_relation

    break if ids.length < batch_limit

    if limit_value
      remaining -= ids.length

      if remaining == 0
        # Saves a useless iteration when the limit is a multiple of the
        # batch size.
        break
      elsif remaining < batch_limit
        relation = relation.limit(remaining)
      end
    end

    batch_relation = relation.where(
      predicate_builder[primary_key, primary_key_offset, order == :desc ? :lt : :gt]
    )
  end
end
```

#### Association
For more detail, please refer to [**Active Record - Association**](https://guides.rubyonrails.org/association_basics.html)

Interesting topic:

# polymorphic (這邊真的要再順一下，為什麼不用兩個 has_many, belongs_to)
When to use `polymorphic`? If a model belongs to more than one model. For example, both product and user can be commented, so we can create `Comment` model with
```
$ rails g model Comment commentable_type:string commentable_id:integer body:text
```
and the model setting would be as follow:
```
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end

class Product < ApplicationRecord
  has_many :comments, as: :commentable
end

class User < ApplicationRecord
  has_many :comments, as: :commentable
end
```
As the setting above, the `commentable_id` will save the id of `product` and `user` and because of the `commentable_type`, no worries if the id of `product` and `user` are the same.

Note that the structure can be written as follow:
```
class Comment < ApplicationRecord
  belongs_to :product
  belongs_to :user
end

class Product < ApplicationRecord
  has_many :comments
end

class User < ApplicationRecord
  has_many :comments
end
```

# STI (single table inheritance)
When to use `single table inheritance`? (skip)

# Polymorphic + STI
For example, if we want to setup a platform and users can be both employer and employee for a task and each task can only have one employer and employee.

Then, the model setups would be

```
class Task < ActiveRecord::Base
  belongs_to :liable, polymorphic: true

  def liable_type=(class_name)
    super(class_name.constantize.base_class.to_s)
  end
end

class User < Active::Base
  has_many :task, as: :liable, dependent: :destroy
end

class Employer < User
  has_and_belongs_to_many :employess
end

class Employee < User
  has_and_belongs_to_many :employers
end
```
Notice! Employer and Employee use the concept of STI(Single-table inheritance).

### Reference

[**Active Record - 维基百科，自由的百科全书**](https://zh.wikipedia.org/wiki/Active_Record)

[**Active Record - Ruby on Rails**](https://guides.rubyonrails.org/active_record_basics.html)

[**polymorphic + STI**](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#label-Polymorphic+Associations)
