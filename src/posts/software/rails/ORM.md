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

Understanding how to efficiently load associated data in advance to minimize database queries, including methods like preload, eager_load, and includes.

* Preload
  * Explanation: Preload is a method in ActiveRecord that loads associations separately from the main query. It executes multiple queries — one for the main record and one for each associated record.
  * Usage: Preload is typically used when the associations are not referenced in the query conditions. It **loads associated data eagerly** but does not utilize a single JOIN query.
  * Example
    ```ruby
    @users = User.preload(:posts)
    ```
  * SQL
    ```sql
    SELECT * FROM users;
    SELECT * FROM posts WHERE user_id IN (user_ids); -- separate SQL
    ```
  * Pros: Reduces the number of database queries compared to lazy loading (N+1 query problem).
  * Cons: Executes multiple queries, which may impact performance for large datasets.
* Eager Load
  * Explanation: Eager loading is similar to preload, but it uses a single JOIN query to load both the main record and its associations simultaneously. This can be more efficient than preload, especially when dealing with large datasets.
  * Usage: Eager loading is used when the associations are referenced in the query conditions.
  * Example
    ```ruby
    @users = User.eager_load(:posts)
    ```
  * SQL
    ```sql
    SELECT users.*, posts.* 
    FROM users 
    LEFT JOIN posts ON posts.user_id = users.id;
    ```
  * Pros: Uses a single JOIN query, which can be more efficient than separate queries.
  * Cons: May result in a larger dataset being returned if associations are not filtered.
* Includes
  * Explanation: Includes is a versatile method in ActiveRecord that can behave like preload or eager_load depending on the situation. It automatically decides whether to use preload or eager_load based on the associations and conditions provided in the query.
  * Usage: Includes is often used when you want ActiveRecord to decide the best strategy for loading associations.
  * Example
    ```ruby
    @users = User.includes(:posts)
    ```
  * Pros: Automatically chooses between preload and eager_load based on associations and conditions.
  * Cons: Less control over the specific loading strategy compared to preload and eager_load.
  * How includes choose: As you can see, preload has two SQLs and eager_load only has one but create a large table with left outer join. As a result, if you care about time, then you should use eager_load; if you care about space, then I should use preload. Extensively, includes also do the same thing here. That is, if the tables are really big then it will use preload. If there are many condition afterward the includes, it will use eager_load as it will be faster.

#### Query Optimization

Learning techniques to optimize database queries for performance, such as indexing, query caching, and using database-specific optimizations like EXPLAIN in SQL databases.

#### Batch Processing

Exploring methods to handle large datasets efficiently, including batch processing, pagination, and using database cursors

#### Transaction Management

Understanding how to manage database transactions effectively to ensure data integrity and improve performance, including techniques like batch updates and minimizing transaction scope

#### Caching

Utilizing caching strategies to reduce database load and improve response times, including fragment caching, query caching, and using caching layers like Memcached or Redis

#### Database Sharding and Replication

Learning about advanced database architectures like sharding and replication to distribute data across multiple servers and improve scalability and performance.

#### Optimizing Data Models

Designing efficient data models that minimize redundancy, improve query performance, and optimize storage usage, including normalization, denormalization, and choosing appropriate data types.

#### Database Profiling and Monitoring

Using tools and techniques to profile database performance, identify bottlenecks, and monitor database health, including database monitoring tools, performance profiling, and logging.

#### Connection Pooling

Configuring and managing database connection pools to efficiently handle database connections and minimize overhead.

#### ORM-specific optimizations

Exploring optimization techniques specific to your ORM framework, such as ActiveRecord in Ruby on Rails or Hibernate in Java, including tuning configuration settings, using batch processing features, and optimizing query generation.
