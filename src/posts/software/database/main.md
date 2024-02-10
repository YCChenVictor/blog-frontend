# Title

## Purpose

Databases provide a structured and efficient way to store, manage, and retrieve large amounts of data.

## Concept

Let's consider an example of building a database system for a blog. The steps:

### Design

* Define problem: I need a way to manage users. There will be two roles, users and admins. Some articles are only visible to login users amd some features are only available to admins.
* Identify entities or relationships: User. If there is relationship between these entities, we use ERD to visualize it.
* Choose a suitable database management system (DBMS). Consider options based on the requirements, data structure, and scalability needs.
  * Relational: [MySQL](/blog/software/database/mysql)
  * NoSQL: [MongoDB]
* Design the database schema
  * Convert the ERD into a logical data model
  * Define tables: User
  * Define constraints to each column

### Framework

Given we have chosen framework such as node or rails. We use framework to do the following tasks:

* Config database
* Migrate Schema
* Develop CRUD API layers with validations, callbacks, and authentication
* Generate sample data script
* Write tests to verify the functionality of CRUD
* Deploy the database
* Maintain and optimize the database
* Continuously improve the database with user feedbacks
  * Optimizations such as caching, [denormalization] strategies, partitioning, sharding

### Efficiency

#### Offset

The OFFSET clause is often used for implementing pagination in query results. For example, suppose you have a large result set, and you want to display results in smaller, more manageable chunks on different pages. The OFFSET clause allows you to skip a specified number of rows before fetching the next set of rows.

```sql
SELECT column1, column2
FROM table
ORDER BY column1
LIMIT 10 OFFSET 20;
```

In this example, the query fetches 10 rows from the result set, starting from the 21st row (OFFSET 20).

* Efficiency Considerations: While OFFSET is useful for implementing pagination, it can have efficiency considerations, especially when dealing with **large datasets**. As the OFFSET value increases, the database engine must skip more rows, which could lead to performance issues. This is because the database engine may need to fetch and discard rows before reaching the desired starting point.

##### Solutions

* Alternative Approaches: Some databases provide alternative approaches to pagination that may be more efficient than using OFFSET, especially for large result sets. For example, using keyset pagination or cursor-based pagination relies on the values of the last retrieved row to fetch the next set, avoiding the need to skip a fixed number of rows.

```sql
SELECT column1, column2
FROM table
WHERE column1 > last_value
ORDER BY column1
LIMIT 10;
```

In this example, last_value is the value of the last retrieved row, which is avoiding `OFFSET` and use the value in column1 directly to do filter as we use `column1` to order the rows.

* Indexing: Efficient pagination can also be influenced by the presence of appropriate indexes on the columns used in the ORDER BY clause. Indexes can help the database engine quickly locate the starting point of the requested result set.

```sql
-- Example: Creating an index on column1
CREATE INDEX idx_column1 ON table (column1);
```

and then retrieve them in the original way

```sql
-- Retrieve the second page
SELECT column1, column2
FROM table
WHERE <conditions>
ORDER BY column1
LIMIT 10 OFFSET 10;
```

Because there is index on column1, the system now can locate the start row of the OFFSET 10 quickly. The indexing is a separate data structure that is maintained by the database management system (DBMS). It is not explicitly visible in the sense that you don't interact with it directly when writing queries. Instead, the DBMS automatically uses the index to optimize query performance.

#### Join

Performing many joins in a relational database can potentially lead to efficiency problems due to the following reasons

* Increased Query Complexity: Each join adds complexity to the SQL query. The database engine needs to analyze and process these joins to retrieve the desired result set. As the number of joins increases, the complexity of the query execution plan also grows, making it more challenging for the database optimizer to find the most efficient way to retrieve the data.
* Performance Overhead: Join operations are resource-intensive. They involve matching rows from multiple tables based on specified conditions, which can require substantial computational resources, especially for large datasets. The time complexity of joins is often higher than that of other query operations, such as filtering or sorting.
* Index Utilization: Join operations may not fully leverage indexes, especially if the join conditions are not well-matched with the available indexes. Inefficient use of indexes can lead to full table scans and slower query performance. Optimizing queries with appropriate indexes is crucial to enhance join performance.
* Data Distribution: When joining large tables, the distribution of data across different servers or storage locations can impact performance. In distributed databases, data needs to be transferred between nodes for join operations, introducing additional latency and overhead.
* Denormalization Trade-Off: While normalization is essential for maintaining data integrity, it may lead to a higher number of joins in queries. Denormalization, which involves storing redundant data to reduce the need for joins, can be considered in some cases but comes with trade-offs related to data consistency and maintenance complexity.
* Query Optimizer Challenges: The query optimizer's task is to determine the most efficient execution plan for a given query. As the number of joins increases, the complexity of finding an optimal plan grows exponentially, making it more challenging for the optimizer to make efficient decisions.

##### Solutions

* Indexing: Ensure that the columns involved in join conditions are indexed appropriately to speed up the matching process.
  * Data
    ```sql
    -- Create employees table
    CREATE TABLE employees (
        employee_id INT PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        department_id INT
    );
    
    -- Insert sample data into employees table
    INSERT INTO employees VALUES
    (1, 'John', 'Doe', 101),
    (2, 'Jane', 'Smith', 102),
    (3, 'Bob', 'Johnson', 101),
    (4, 'Alice', 'Williams', 103),
    (5, 'Charlie', 'Brown', 102);
    
    -- Create departments table
    CREATE TABLE departments (
        department_id INT PRIMARY KEY,
        department_name VARCHAR(50)
    );
    
    -- Insert sample data into departments table
    INSERT INTO departments VALUES
    (101, 'Sales'),
    (102, 'Marketing'),
    (103, 'Finance');
    ```
  * Join
    ```sql
    SELECT e.employee_id, e.first_name, e.last_name, d.department_name
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id;
    ```
  * Indexing
    ```sql
    CREATE INDEX idx_department_id ON employees (department_id);
    -- MySQL scans the existing data in the department_id column and creates an index structure that allows for efficient lookup based on the values in that column

    -- The idx_department_id index would store a sorted list of unique values from the department_id column (101, 102, 103) along with pointers to the corresponding rows in the employees table.
    ```
  * Explanation: MySQL will create **unique** indexes mapping `department_id` and `employee_id`. With these unique indexes, we can do more efficient search such as binary search.
* Query Optimization: Write efficient queries by selecting only the necessary columns and optimizing the use of indexes.
* Denormalization: Evaluate the possibility of denormalizing data in cases where read performance is critical, striking a balance between query complexity and data consistency.
  * Solution: through denormalization, it directly diminish the number of joins
