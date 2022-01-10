---
layout: post
title: (rails) Active Record
date: '2021-06-10'
categories: rails
note:
---

## Introduction
In rails, active record serves as the layer responsible for business data and logic and the model in MVC structure. In business environment, the persistent process of data usage and creation requires a way to connect to database persistently, so called **Active Record**.

1. Table map to classes
2. Rows map to objects
3. Columns map to object attributes

## Why

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

## How

I am going to explore the following topics:

1. CRUD
2. Validation
3. Callbacks

### CRUD

Let's take a look at the gem,

Please rails new a project and create a random table (I create table with `rails g scaffold User name:string email:string` and then `rails db:migrate`) and then we can create a new User with `test = User.create`.

To track the source code, `bundle open activerecord` and it will open the gem in `.rvm/gems/ruby-2.7.4/gems/activerecord-6.1.4.4/lib` and the source of CRUD:

1. `create`: in `activerecord/lib/active_record/persistence.rb`
2. `find`: in `activerecord/lib/active_record/core.rb` (skip)
3. `update`: in `activerecord/lib/active_record/persistence.rb` (skip)
4. `destroy`: in `activerecord/lib/active_record/persistence.rb` (skip)

Then we can put `binding.pry` in the method (make sure you have installed pry) and start to explore it. Try to find the raw SQL code. After you have done, input `bundle pristine activerecord` to recover the gem.

Or you can use [AppMap](https://appland.com/products/appmap)

#### create

Add `binding.pry` in class as follow:
```ruby
class User < ApplicationRecord
  binding.pry
end
```
and input `User.create` in rails console

Then the data flow of `create` would be as follow:
1. `self.create` in `.../research_activerecord/app/models/user.rb`
2. `register` in `.../.rvm/gems/ruby-2.7.4/gems/bootsnap-1.9.3/lib/bootsnap/load_path_cache/loaded_features_index.rb`
3. `require` in `.../.rvm/gems/ruby-2.7.4/gems/bootsnap-1.9.3/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb`
4. `require` in `.../.rvm/gems/ruby-2.7.4/gems/zeitwerk-2.5.3/lib/zeitwerk/kernel.rb`
5. (key method here) `create` in `.../.rvm/gems/ruby-2.7.4/gems/activerecord-6.1.4.4/lib/active_record/persistence.rb`
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
6. `new` in `lib/active_record/inheritance.rb` (not sure)
7. `ActiveRecord::Base` in `lib/active_record/base.rb` -> `include Core` & `include Persistence`
8. `set_last_value` in `/Users/spare/.rvm/rubies/ruby-2.7.4/lib/ruby/2.7.0/irb/context.rb`
9. ... (gonna to explore it someday)
10. `path_to_adapter = "active_record/connection_adapters/#{db_config.adapter}_adapter"` in `resolve_pool_config` of `connection_pool.rb` to determine which adapter file to be used for connection
11. xxx_adaptor.rb (xxx is the database name) (Adapter pattern is a design pattern)
12. `establish_connection` in `active_record/connection_handling.rb`
13. 接下來就是把 mysql 跟 pg 的 INSERT 解釋一下，大概就是這樣，雖然做得很混，但我盡力了

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

## Reference

[**Active Record - 维基百科，自由的百科全书**](https://zh.wikipedia.org/wiki/Active_Record)

[**Active Record - Ruby on Rails**](https://guides.rubyonrails.org/active_record_basics.html)

[**polymorphic + STI**](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#label-Polymorphic+Associations)

[ODBC and writing your own ActiveRecord adapter](https://eng.localytics.com/odbc-and-writing-your-own-activerecord-adapter/)
