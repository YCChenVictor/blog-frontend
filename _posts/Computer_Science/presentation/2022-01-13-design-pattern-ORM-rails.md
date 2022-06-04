---
layout: post
title: 'design pattern ORM rails'
description: ''
date: '2022-01-13'
categories: presentation
note: 
publish: true
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

Given I have a project with a model, `User` and track the source code with `bundle open activerecord` (No worries, we can use `bundle pristine activerecord` to recover the gem)

I am going to explain it with steps:

1. How `User.create` link to general methods of create
2. How these general methods link specific SQL with connection
3. How connection_handler works
4. The conecept of design pattern of these adapters

### 1. How `User.create` link to general methods of create

Fire up the rails console, and input `User.create`, then the SQL would be
```SQL
TRANSACTION (0.1ms)  begin transaction
User Create (0.4ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2022-01-11 02:01:31.475084"], ["updated_at", "2022-01-11 02:01:31.475084"]]
TRANSACTION (1.0ms)  commit transaction
```

I am using SQLite. But why rails knows to use the INSERT grammar for SQLite instead of MySQL or PostgreSQL?

Add `binding.pry` in class as follow:

```ruby
class User < ApplicationRecord
  binding.pry
end
```
and input `User.create` in rails console

Then the data flow of `create` would be as follow:
1. Given that there is no `create` in `.../app/models/user.rb`, it will call the `create` method in superclass
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
As you can see, it will call `new` and then `save` method, meaning `create` methods equals to `new` + `save`. The `initialize` is in `Core` and the `save` is in `Persistence`. I am not going to track `new` and `save` method all the way through because it is too difficult and a little bit out of scope.

6. `new` method in `Core`
  ```ruby
  def initialize(attributes = nil)
    @new_record = true
    @attributes = self.class._default_attributes.deep_dup
  
    init_internals
    initialize_internals_callback
  
    assign_attributes(attributes) if attributes
  
    yield self if block_given?
    _run_initialize_callbacks
  end
  ```

1. `save` in `persistence.rb`
```ruby
def save(**options, &block)
  create_or_update(**options, &block)
rescue ActiveRecord::RecordInvalid
  false
end
```
`create_or_update` -> `result = new_record? ? _create_record(&block) : _update_record(&block)` -> `_create_record(&block)` -> `yield(self)` -> ...


### 2. How these general methods link specific SQL

A connection method called once activerecord being loaded and it determines which **adapter** to be used. Given that connection, the methods and plain SQL connect together. Take `insert_all` in `persistence.rb` as example

1. `insert_all` in `persistence.rb` -> `InsertAll.new(...).execute`
2. `new` will call `initialize(model, ...)` in `insert_all.rb` and the model is `User` in my case
3.  `execute` will call `connection.exec_insert_all to_sql, message` and the `connection` = `@connection` = `model.connection`
4. `@connection = model.connection` and `model` is the `self` in `InsertAll.new`, which is `User` in my case -> find `connection` method in superclass -> `retrieve_connection` in `connection_handling.rb` -> `connection_handler` (gonna to explain it in next section)
5. `exec_insert_all` in `database_statements.rb` -> `to_sql` = `connection.build_insert_sql(...)` -> `build_insert_sql` can be in `abstract_adapter.rb`, `abstract_mysql_adapter.rb`, `postgresql_adapter.rb`, or `sqlite3_adapter.rb`
6. rails determines which `build_insert_sql` to be used by `connection`, which is setup by `connection_handler`

### 3. How connection_handler works

1. `establish_connection` in `connection_handling.rb`
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
3. and it will call method `connection_handler`, which is `self.connection_handler` in `core.rb`
4. call `default_connection_handler` given there is no thread currently -> `self.default_connection_handler = ConnectionAdapters::ConnectionHandler.new`
5. The `new` will call `initialize` in `class ConnectionHandler` of `connection_pool.rb`
6. so it actually call `establish_connection` in `connection_pool.rb` -> `resolve_pool_config`, which determines which adapter to be used by `path_to_adapter = "active_record/connection_adapters/#{db_config.adapter}_adapter"` and `require path_to_adapter` (**where the determination of adapter**)
7. Take mysql as example, it require `.../lib/active_record/connection_adapters/mysql2_adapter.rb` -> `require "active_record/connection_adapters/abstract_mysql_adapter"`
8. Then now it know to call the `build_insert_sql` in `.../lib/active_record/connection_adapters/abstract_mysql_adapter` in last section

### 4. The conecept of design pattern of these adapters

Take a look at these adapter, they all inherit from `AbstractAdapter`
```ruby
SQLite3Adapter < AbstractAdapter
Mysql2Adapter < AbstractMysqlAdapter < AbstractAdapter
PostgreSQLAdapter < AbstractAdapter
```

Take `supports_ddl_transactions` as example, the default setting in `AbstractAdapter`
```ruby
def supports_ddl_transactions?
  false
end
```
PostgreSQL support it, so rewrite this method with
```ruby
def supports_ddl_transactions?
  true
end
```

Take `build_insert_sql` as example

In MySQL,
```ruby
def build_insert_sql(insert) # :nodoc:
  sql = +"INSERT #{insert.into} #{insert.values_list}"

  if insert.skip_duplicates?
    no_op_column = quote_column_name(insert.keys.first)
    sql << " ON DUPLICATE KEY UPDATE #{no_op_column}=#{no_op_column}"
  elsif insert.update_duplicates?
    sql << " ON DUPLICATE KEY UPDATE "
    sql << insert.touch_model_timestamps_unless { |column| "#{column}<=>VALUES(#{column})" }
    sql << insert.updatable_columns.map { |column| "#{column}=VALUES(#{column})" }.join(",")
  end

  sql
end
```

In PostgreSQL,
```ruby
def build_insert_sql(insert) # :nodoc:
  sql = +"INSERT #{insert.into} #{insert.values_list}"

  if insert.skip_duplicates?
    sql << " ON CONFLICT #{insert.conflict_target} DO NOTHING"
  elsif insert.update_duplicates?
    sql << " ON CONFLICT #{insert.conflict_target} DO UPDATE SET "
    sql << insert.touch_model_timestamps_unless { |column| "#{insert.model.quoted_table_name}.#{column} IS NOT DISTINCT FROM excluded.#{column}" }
    sql << insert.updatable_columns.map { |column| "#{column}=excluded.#{column}" }.join(",")
  end

  sql << " RETURNING #{insert.returning}" if insert.returning
  sql
end
```

As you can see the framework of sql in `build_insert_sql` is the same as `sql = +"INSERT #{insert.into} #{insert.values_list}"` and given the conditions the sql code modified according to database languages.
