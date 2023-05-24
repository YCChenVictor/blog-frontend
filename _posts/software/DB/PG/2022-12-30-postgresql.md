---
layout: post
title:
description: ''
date: '2022-12-30'
categories: PG
note:
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes basic concepts related to postgreSQL.

## Why?

* Robust feature set: PostgreSQL has a comprehensive feature set that supports advanced data types, indexes, stored procedures, triggers, and more.
* Scalability: PostgreSQL is designed to scale horizontally, meaning that you can add more resources to the system as your data and processing needs grow.
* Strong reliability: PostgreSQL is known for its strong reliability and stability.
* Open source
* Active community
* Strong security: PostgreSQL has a strong focus on security, with features such as role-based access control, data encryption, and secure communication protocols built in.

## How?

### init

use homebrew:

```bash
brew install postgresql
```

start server:

```bash
brew services start postgresql
```

and check it with

```bash
brew services list
```

debug the logs

```bash
tail -n 50 /usr/local/var/log/postgresql@14.log
```

### Connect

#### Password

In `~/pgpass.conf`

```bash
hostname:port:database:username:password
```

and permissions set to 0600

#### In Terminal

* input when we did not setup hostname, port, database, username, password
  ```bash
  psql -h <host> -p <port> -U <username> <database>
  ```
* input when we already setup hostname, port, database, username, password
  ```bash
  psql postgres
  ```
* remove process

```bash
ps -ef | grep postmaster | grep -v grep | awk '{print $2}'
kill <the_pid_you_just_got>
```

#### With Docker

[connect docker]({{site.baseurl}}/docker/2022/01/09/docker.html#run)

and then

```bash
docker run --name my_db \
    -e POSTGRESQL_PORT=5432 \
    -e POSTGRESQL_DB=my_db \
    -e POSTGRESQL_USER=postgres \
    -e POSTGRES_PASSWORD=test1234 \
    -d postgres
```

* remember to create desired database first
* remember to change desired `my_db`, `postgres` and `test1234`, which will match `DEV_DATABASE_URL` below

### database

create:

```bash
CREATE DATABASE <database_name>;
```

show:

```bash
\l
```

use:

```bash
\c <database_name>;
```

delete:

```bash
DROP DATABASE <database name>;
```

### table

Create:

```bash

```

or with

* [node migration]()
* [rails migration]()

Show:

```bash
\dt
```

### user

Show

```bash
\du
```

### CRUD of row

CREATE

```SQL
-- general
INSERT INTO table (variable1, variable2, variable3) VALUES (value1, value2, value3);

-- example
INSERT INTO users (username, password, email) VALUES ('john', '123456', 'john@example.com');
```

READ

```SQL
-- general
SELECT * FROM table WHERE variable1 = value1;

-- example
SELECT * FROM users WHERE username = 'john';
```

UPDATE

```SQL
-- general
UPDATE table SET variable1 = value1 WHERE variable2 = value2;

-- example
UPDATE users SET password = '654321' WHERE username = 'john';
```

DELETE

```SQL
-- general
DELETE FROM table WHERE variable1 = value1;

-- example
DELETE FROM users WHERE username = 'john';
```

## What?

give an example

## Reference

[Homebrew](https://wiki.postgresql.org/wiki/Homebrew)

[How to use .pgpass in PostgreSQL?](https://tableplus.com/blog/2019/09/how-to-use-pgpass-in-postgresql.html)
