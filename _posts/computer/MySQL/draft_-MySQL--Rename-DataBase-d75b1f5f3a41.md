---
title: (MySQL) Rename DataBase
description: reference…
date: ''
categories: []
keywords: []
slug: ''
---

**\[方法3\] 新建一個DB，將所有TABLE都RENAME到新DB底下，再DROP舊DB**

CREATE DATABASE new\_db\_name;  
RENAME TABLE db\_name.table1 TO new\_db\_name.table1,  
db\_name.table2 TO new\_db\_name.table2;  
DROP DATABASE db\_name;

**\[方法4\] 用mysqldump先export資料再import進新DB**

**EXPORT DB**  
mysqldump -uroot -p pwd db\_name > db\_name\_dump.sql

**CREATE NEW DB**  
mysqladmin -uroot -p pwd create new\_db\_name   
或是  
mysql -uroot -p pwd -e “create database new\_db\_nme”

**IMPORT DB**  
mysql -uroot -p pwd new\_db\_name < db\_name\_dump.sql

**DROP OLD DB**  
mysql -uroot -p pwd -e “DROP DATABASE db\_name”