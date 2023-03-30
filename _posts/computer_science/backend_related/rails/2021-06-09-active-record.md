---
layout: post
title:
date: '2021-06-10'
categories: rails
note: 這篇之後要分拆，太大一篇了
publish: true
---

## Introduction

* Software design pattern
* Used in object-oriented programming to manage database access
* A part of the Model-View-Controller (MVC) architectural pattern
* Provides an easy and intuitive way to represent and manipulate data stored in a database
* Define classes that map to database tables, and provides a set of methods that can be used to query, insert, update, and delete records from the database
  * Table map to classes
  * Rows map to objects
  * Columns map to object attributes
* Abstracts away much of the low-level database interaction code that developers would otherwise have to write. This makes it easier to work with databases, and also reduces the likelihood of errors and bugs
* Used in popular web frameworks such as Ruby on Rails, Django, and Laravel. It is a powerful tool that allows developers to focus on building their applications, rather than on database management

## Why

Active Record is a specific implementation of [ORM]({{site.baseurl}}//rails/2022/01/13/object-relational-mapping.html) that maps database tables to objects. It allows developers to work with database records as if they were objects, with each record represented by a single instance of a class. Active Record handles the persistence of the objects to the database and provides methods for querying and updating the data.

## How

Research Active Record in Rails. Rails use adapter design pattern for user to use same syntax for different SQL.

### design pattern

Please understand [adapter]() first.

### Source code of CRUD

Please rails new a project and create a random table (I create table with `rails g scaffold User name:string email:string` and then `rails db:migrate`) and then we can create a new User with `test = User.create`.

To track the source code, `bundle open activerecord` and it will open the gem in `.rvm/gems/ruby-2.7.4/gems/activerecord-6.1.4.4/lib` and the source of CRUD:

1. `create`: in `activerecord/lib/active_record/persistence.rb`
2. `find`: in `activerecord/lib/active_record/core.rb` (skip)
3. `update`: in `activerecord/lib/active_record/persistence.rb` (skip)
4. `destroy`: in `activerecord/lib/active_record/persistence.rb` (skip)

Then we can track it with `binding.pry`. Try to find the raw SQL code. After you have done, input `bundle pristine activerecord` to recover the gems.

In rails console, input `ActiveRecord::Base.connection.adapter_name` to know what database system using.

I am going to use three sections to explain these methods
1. How `User.create` link to general methods of ActiveRecord of create
2. How these general methods link the plain SQL
3. How rails determines which plain SQL being used by connection methods
4. The conecept of design pattern of these adapters
#### create

##### How `User.create` link to general methods of ActiveRecord of create

Fire up the rails console, and input `User.create`, then the SQL would be
```SQL
TRANSACTION (0.1ms)  begin transaction
User Create (0.4ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2022-01-11 02:01:31.475084"], ["updated_at", "2022-01-11 02:01:31.475084"]]
TRANSACTION (1.0ms)  commit transaction
```

I am using SQLite and the key issue is why rails knows to use the INSERT grammar for SQLite instead of MySQL or PG.

Add `binding.pry` in class as follow:

```ruby
class User < ApplicationRecord
  binding.pry
end
```
and input `User.create` in rails console

Then the data flow of `create` would be as follow:
1. `create` method in superclass when calling `user.create` in `.../research_activerecord/app/models/user.rb`
2. the superclass of `User`: `ApplicationRecord`
3. the superclass of `ApplicationRecord`: `ActiveRecord::Base`
4. Have a look at `base.rb`
```ruby
module ActiveRecord #:nodoc:
  ...
  class Base
    ...
    extend ConnectionHandling
    ...
    include Core
    include Persistence
    ...
  end
  ...
end
```

Given that we know, `create` methods equals to `new` + `save`, then in `Core`, there are methods such as `initialize` and in `Persistence`, there are methods such as `save`.

1. The `create` method in `persistence.rb`

```ruby
def create(attributes = nil, &block)
  if attributes.is_a?(Array)
    attributes.collect { |attr| create(attr, &block) }
  else
    object = new(attributes, &block)
    object.save
    object
  end
end
```
As you can see, it will call `new` and then `save` method.

1. `new` (skip)
2. `save` in `persistence.rb` -> `create_or_update` -> `result = new_record? ? _create_record(&block) : _update_record(&block)` -> `_create_record(&block)` -> `yield(self)` (追不下去)

##### How these general methods link the plain SQL

1. `insert_all` in `.../lib/active_record/persistence.rb` -> `InsertAll.new(self, attributes, on_duplicate: :skip, returning: returning, unique_by: unique_by).execute`
  1. `initialize(model, inserts, on_duplicate:, returning: nil, unique_by: nil)` in `.../lib/active_record/insert_all.rb` and the model is `User` in my case
  2. `execute` in `.../lib/active_record/insert_all.rb`
2.  `execute` -> `connection.exec_insert_all to_sql, message`
  1. `connection` in `attr_reader :connection`, which means
     ```ruby
     def connection
       @connection
     end
     ```
  2. `@connection = model.connection` and `model` is the `self` in `InsertAll.new`, which is `User` in my case.
  3. `exec_insert_all` in `database_statements.rb`
  4. `to_sql` = `connection.build_insert_sql(ActiveRecord::InsertAll::Builder.new(self))`
3.  `build_insert_sql` can be in `abstract_adapter.rb`, `abstract_mysql_adapter.rb`, `postgresql_adapter.rb`, or `sqlite3_adapter.rb`
4. rails determines which `build_insert_sql` to be used by `connection`

##### How rails determines which plain SQL being used by connection methods

Then how does it determine what SQL command to use? 
1. `establish_connection` in `.../lib/active_record/connection_handling.rb`
2. it determines which adapter to be used through `establish_connection`
```ruby
ActiveRecord::Base.establish_connection(
  adapter:  "mysql2",
  host:     "localhost",
  username: "myuser",
  password: "mypass",
  database: "somedatabase"
)
```
3. and it will call `connection_handler`, which is `self.connection_handler` in `core.rb`
4. call `default_connection_handler` given there is no thread -> `self.default_connection_handler = ConnectionAdapters::ConnectionHandler.new`
5. `initialize` in `class ConnectionHandler` of `connection_pool.rb`
6. so it actually call `establish_connection` in `connection_pool.rb` -> `resolve_pool_config` -> `path_to_adapter = "active_record/connection_adapters/#{db_config.adapter}_adapter"` -> `require path_to_adapter` (**where the determination of adapter**)
7. Take mysql as example, it require `.../lib/active_record/connection_adapters/mysql2_adapter.rb` -> `require "active_record/connection_adapters/abstract_mysql_adapter"`
8. `build_insert_sql` in `.../lib/active_record/connection_adapters/abstract_mysql_adapter`

##### The conecept of design pattern of these adapters
to be continued

SQLite3Adapter < AbstractAdapter

Mysql2Adapter < AbstractMysqlAdapter < AbstractAdapter

PostgreSQLAdapter < AbstractAdapter

之後再從這裡繼續，就是要大概知道這個轉接器怎麼出來的，還有他會怎麼處理 create，至於 object or class adapter 我實在分不出來，算了

#### find

#### update

#### destroy

### Validation

For data to be consistent in a model, we should validate it **before** inserting into a database. The methods for validation in [Active Record Validation - Ruby on Rails](https://guides.rubyonrails.org/active_record_validations.html)

### Callbacks

Callback is the function that are going to be call after a function executed.

The life cycle of an object in a framework always plays key role. The process:
<img src="/assets/img/active_record_callbacks.png" alt="">(reference: [**railsbook.pdf**](https://railsbook.tw/))

The above cycle only shows the hooks of save. For more information, please refer to [active record callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)

#### Some interesting queries: (I cannot understand it right now)

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

### Association
For more detail, please refer to [**Active Record - Association**](https://guides.rubyonrails.org/association_basics.html). Some interesting association: polymorphic, STI, polymorphic + STI

#### polymorphic
We should use `polymorphic`, if a model belongs to more than one model and the meaning of the `belongs_to` are almost the same. However, if the `belongs_to` has significantly different meanings, then we should use multiple `has_many` and `belongs_to` rather than `polymorphic`. For example, both product and user can be commented, so we can create `Comment` model with
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

#### STI (single table inheritance)
When to use `single table inheritance`? (skip)

#### Polymorphic + STI
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

Try to understand how to query in rails with [ActiveRecord Query Interface](https://guides.rubyonrails.org/active_record_querying.html)

## Reference

[**Active Record - 维基百科，自由的百科全书**](https://zh.wikipedia.org/wiki/Active_Record)

[**Active Record - Ruby on Rails**](https://guides.rubyonrails.org/active_record_basics.html)

[**polymorphic + STI**](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#label-Polymorphic+Associations)

[ODBC and writing your own ActiveRecord adapter](https://eng.localytics.com/odbc-and-writing-your-own-activerecord-adapter/)

(http://www.monkeyandcrow.com/blog/reading_rails_the_adapter_pattern/)
