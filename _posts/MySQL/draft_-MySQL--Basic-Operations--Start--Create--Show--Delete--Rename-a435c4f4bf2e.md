---
title: '(MySQL) Basic Operations: Start, Create, Show, Delete, Rename'
description: >-
  This Article briefly describes how to setup MySQL and Create DATABASEs and
  TABLEs.
date: ''
categories: []
keywords: []
slug: ''
---

### Start MySQL:

#### Call SQL in terminal:

/usr/local/mysql/bin/mysql -uroot -p

#### Enter password:

your\_password

#### list all the databases:

SHOW DATABASES;

### Create:

#### Create new database, database\_name:

CREATE DATABASE database\_name

#### Select DATABASE:

USE database\_name

#### Create table in the database; for example, 

CREATE TABLE users(id INT(11) AUTO\_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), username VARCHAR(30), password VARCHAR(100), register\_date TIMESTAMP DEFAULT CURRENT\_TIMESTAMP);

### Show:

#### Show up the tables

SHOW TABLES;

#### See the setting of a table

DESCRIBE users;

#### View the content of a table

SELECT \* FROM users;

### Delete 

#### Delete specific row in table:

DELETE FROM ‘table\_name’ WHERE id = ‘number’ LIMIT 1

#### Delete specific table in DataBase:

```
DROP TABLE "TABLE_NAME";
```

#### Delete Database:

```
drop database <db_name>;
```

### Rename

#### Rename DataBase:

To Be Continued

#### Rename Tables:

RENAME TABLE tb1 TO tb2;