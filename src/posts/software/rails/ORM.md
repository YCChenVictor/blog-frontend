# Title

## Purpose

* ORM is based on [OOP concepts]({{site.baseurl}}/concept/2021/11/21/Object-Oriented-Programming.html). Some important concepts to learn include classes, objects, inheritance, polymorphism, and encapsulation
* ORM is a technique that maps database tables to classes, and vice versa, so that developers can work with the database using object-oriented programming.

## Concept

* Models: In Rails, models represent database tables. Each model class typically corresponds to a table in the database, and instances of these classes represent individual records.
* Fields: Fields are attributes of a model that represent the columns in the corresponding database table. Each field has a data type and a set of constraints that determine how data is stored and validated.
* Relationships: Relationships define how models are related to each other in the database. There are several types of relationships, such as one-to-one, one-to-many, and many-to-many.
* Querysets: Querysets are objects that represent a collection of model objects that match a certain query. Querysets allow developers to retrieve, filter, and sort data from the database using object-oriented syntax.
* Transactions: ActiveRecord supports database transactions, which ensure that a series of database operations either all succeed or all fail together.
* Migrations: Migrations are Ruby classes that make it easy to create and modify database schema. They allow you to version control changes to your database schema along with your application code.
* Associations: ActiveRecord provides convenient methods for defining relationships between models. Common associations include belongs_to, has_many, has_one, and has_many :through.
* Polymorphic Associations: These associations allow a model to belong to more than one other model on a single association.
* Validations: Rails allows you to validate the data before it gets saved into the database. This helps maintain data integrity and ensures that only valid data is stored.
* Callbacks: Callbacks are methods that are called at certain points in the lifecycle of an ActiveRecord object, such as before validation, after validation, before save, after save, etc.
* Query Interface: ActiveRecord provides a powerful query interface for retrieving and manipulating data from the database. This includes methods like where, order, limit, offset, joins, etc.
* Scopes: Scopes allow you to define reusable queries that can be chained together to build more complex queries.
* Enums: Enums allow you to define a set of possible values for an attribute. This can be useful for attributes that have a limited set of options.

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
