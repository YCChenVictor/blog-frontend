---
title: (MySQL 1) Overview
description: 'Uninstall:'
date: '2021-07-06'
categories: []
keywords: []
slug: ''
note: introduction, uninstall and install
---

## Summary

## Why?

## How?

### introduction
w3school: SQL is a standard language for storing, manipulating and retrieving data in databases.

### The basic structure of a SQL command
```
SELECT
FROM
WHERE


```

## What?

#### Uninstall:

*   Open a terminal window
*   Use mysqldump to backup your databases to text files! (skipped)
*   Stop the database server
*   `sudo rm -rf /usr/local/mysql*`
*   `sudo rm -rf /Library/StartupItems/MySQLCOM`
*   `sudo rm -rf /Library/PreferencePanes/My*`
*   `rm -rf ~/Library/PreferencePanes/My*`
*   `sudo rm -rf /Library/Receipts/mysql*`
*   `sudo rm -rf /Library/Receipts/MySQL*`
*   `sudo rm -rf /**private**/var/db/receipts_/*mysql*_`

#### Install:

[https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html](https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html)


## reference
[**w3school**](https://www.w3schools.com/SQl/default.asp)
