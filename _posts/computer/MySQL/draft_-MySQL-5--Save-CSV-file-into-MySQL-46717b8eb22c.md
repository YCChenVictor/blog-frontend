---
title: (MySQL_5) Save CSV file into MySQL
description: >-
  This Article describes how to load CSV file into MySQL and how to solve the
  errors during the procedure.
date: ''
categories: []
keywords: []
slug: ''
---

### 1\. Create the tables with same columns as CSV file:

CREATE TABLE Nikkei\_225 (

id INT NOT NULL AUTO\_INCREMENT,

Date `DATE NOT NULL,` 

Open DECIMAL`(19, 4)`,

High DECIMAL`(19, 4)`,

Low DECIMAL`(19, 4)`,

Close DECIMAL`(19, 4)`, 

Adj\_Close DECIMAL`(19, 4)`,

PRIMARY KEY (id)

);

### 2\. Load data:

LOAD DATA INFILE ‘/private/tmp/C.csv’

INTO TABLE Citigroup\_Inc

FIELDS TERMINATED BY ‘,’

ENCLOSED BY ‘“‘

LINES TERMINATED BY ‘\\n’

IGNORE 1 ROWS;

FIELDS TERMINATED BY ‘,’ means the method to separate each data in a row is by ,

ENCLOSED BY ‘“‘ means each data is warped by “ 

LINES TERMINATED BY ‘\\n’ means the separating method between each line is \\n, the regular expression representing change line.

IGNORE 1 ROWS means the process during import csv file will ignore the column names whose location is on first row.

### If ERROR 1290 (HY000): The MySQL server is running with the — secure-file-priv option so it cannot execute this statement, then do the following:

#### Show the status of secure\_file\_priv:

show global variables like ‘%secure\_file\_priv%’;

**The status:**

*   If secure\_file\_priv is NULL, mysql can’t read or write from any document.
*   If secure\_file\_priv is /tmp, then only the items in /tmp can be read or write.
*   If secure\_file\_priv is empty, then no rescrition for reading or writing document in MySQL.

#### Turn off MySQL in preference

#### Change secure\_file\_priv into empty:

1.  create my.cnf into /private/etc
2.  add following into my.cnf

\[mysqld\]  
secure\_file\_priv=''

#### Turn on MySQL in perference

### If ERROR 13 (HY000): Can’t get stat of ‘/private/tmp/data/C.csv’ (OS errno 13 — Permission denied), then do the following:

#### move the files to /tmp

(notice! There can’t be any other folder in the path; for example, /private/tmp/C.csv but not /private/tmp/data/C.csv)