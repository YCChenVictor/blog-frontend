---
title: MySQL
description: MySQL (personal codes included)
date: ''
categories: []
keywords: []
slug: ''
---

  

### MySQL

  

### MySQL (personal codes included)

#### This Article briefly describes how to setup MySQL and Create DATABASEs and TABLEs.

#### Install MySQL(skipped)

#### Call the sql in terminal:

/usr/local/mysql/bin/mysql -uroot -p

#### Enter password:

t1993820901

#### list out the database in the machine:

SHOW DATABASES;

#### CREATE NEW DATABASE, DataBase\_Name:

CREATE DATABASE DataBase\_Name

#### Select DATABASE:

USE DataBase\_Name

#### Put in table in the database; for example,

CREATE TABLE users(id INT(11) AUTO\_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), username VARCHAR(30), password VARCHAR(100), register\_date TIMESTAMP DEFAULT CURRENT\_TIMESTAMP);

#### Show up the table just created:

SHOW TABLES;

#### See the setting of a table:

DESCRIBE users;

#### View the content of a table:

SELECT \* FROM users;

#### Put in new table in database:

CREATE TABLE articles (id INT(11) AUTO\_INCREMENT PRIMARY KEY, title VARCHAR(255), author VARCHAR(100), body TEXT, create\_data TIMESTAMP DEFAULT CURRENT\_TIMESTAMP);

#### Delete specific row in table:

DELETE FROM ‘table\_name’ WHERE id = ‘number’ LIMIT 1

#### Delete specific table in DataBase:

```
DROP "TABLE_NAME";
```