---
title: MySQL_3 (About Data Type)
description: >-
  Integer Types (Exact Value) — INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT,
  BIGINT
date: ''
categories: []
keywords: []
slug: ''
---

  

#### [Integer Types (Exact Value) — INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

#### NOT NULL

The value can’t be NULL in this column.

#### VARCHAR(255), CHAR(30):

The string can include up to 255 characters.

#### Dates: 

The `DATE` type is used for values with a date part but no time part. MySQL retrieves and displays `DATE` values in `'YYYY-MM-DD'` format. The supported range is`'1000-01-01'` to `'9999-12-31'`.

The `DATETIME` type is used for values that contain both date and time parts. MySQL retrieves and displays `DATETIME` values in `'YYYY-MM-DD HH:MM:SS'` format. The supported range is `'1000-01-01 00:00:00'` to `'9999-12-31 23:59:59'`.

The `TIMESTAMP` data type is used for values that contain both date and time parts. `TIMESTAMP` has a range of `'1970-01-01 00:00:01'` UTC to `'2038-01-19 03:14:07'` UTC.

#### DECIMAL:

DECIMAL(`**_M_**`,`**_D_**`) meaning: 

*   `**_M_**` is the maximum number of digits (the precision). It has a range of 1 to 65.
*   `**_D_**` is the number of digits to the right of the decimal point (the scale). It has a range of 0 to 30 and must be no larger than `**_M_**`.

#### PRIMARY KEY:

The PRIMARY KEY constraint uniquely identifies each record in a database table.

Primary keys must contain UNIQUE values, and cannot contain NULL values.

A table can have only one primary key, which may consist of single or multiple fields.