---
layout: post
title: 'design pattern ORM rails'
description: ''
date: '2022-01-13'
categories: report
note: 
---

## Introduction & Why

In rails, active record serves as the layer between model and database.

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

## How?

Given I have a project with a model, `User` and track the source code with `bundle open activerecord` and we can use `bundle pristine activerecord` to recover the gem. We know what adapter used in activerecord with `activerecord/lib/active_record/persistence.rb`

I am going to explain it with steps:

1. How `User.create` link to general methods of ActiveRecord of create
2. How these general methods link the plain SQL
3. How rails determines which plain SQL being used by connection methods
4. The conecept of design pattern of these adapters

### How `User.create` link to general methods of ActiveRecord of create

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
1. Given that there is no `create` in `.../research_activerecord/app/models/user.rb`, it will call the `create` method in superclass
2. the superclass of `User` is `ApplicationRecord`
3. the superclass of `ApplicationRecord` is `ActiveRecord::Base`
4. Have a look at `base.rb`:
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

5. The `create` method in `persistence.rb`
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
As you can see, it will call `new` and then `save` method, meaning `create` methods equals to `new` + `save`. The `initialize` is in `Core` and the `save` is in `Persistence`.

6. `new` (skip)
7. `save` in `persistence.rb` -> `create_or_update` -> `result = new_record? ? _create_record(&block) : _update_record(&block)` -> `_create_record(&block)` -> `yield(self)` (追不下去)

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
## What?

give an example

## Reference
