---
layout: post
title: (database) ACID
date: '2022-05-14'
categories: database presentation
note: 關於 How database 達成 ACID 的技術比較複雜，這裡就講基本概念跟效果即可
mathjax:
mermaid:
p5:
threeJS:
---

## Introduction

A database transaction means an indivisible unit of work. **ACID** is the **abbreviation** of four words: **atomicity, consistency, isolation, durability**. With ACID, the database performs transactions reliably.

* atomicity: atomicity ensures one transaction is treated as a **single** unit
* consistency: consistency ensures transaction can only bring the database from one **valid state** to another
* isolation: isolation ensures **concurrent** transactions leaves the database in the **same state**
* durability: durability ensures the changes from transaction will remain committed even in the case of a **system failure**

## Why?

If database did not follow this propreties,

* no atomicity: transaction fails -> some SQL command processed and **some did not**, making database changed uncompletely
* no consistency: transaction did not follow all **pre-defined rules** such as callbacks, default values, ...etc -> database corrupted, making it to be unstable in the future
* no isolation: **concurrent** transactions reading and writing to a table at the same time -> no rules to determine when to **share the same state** to other users -> inconsistent results
* no durability: some transactions occur at system crash -> transactions **disappear**

## How? & What?

We all care about money, so let's use database in bank as example; for example,

| BalanceAccount |
| id | user | balance
| :--- | :----: | :---: |
| 1 | A | $5,000 |
| 2 | B | $5,000 |

### Atomicity

User A want to transfer $1,000 dollar to user B. Then the database must execute these two SQL commnads

```SQL
UPDATE BalanceAccount SET Balance = Balance - 1000 WHERE id = 1
UPDATE BalanceAccount SET Balance = Balance + 1000 WHERE id = 2
```

If system did not follow the design of atomicity, then it may execute command 1 but not command 2 and $1,000 dollars disappear.

To solve this issue, given we know what procedure is, atomicity can be achieved with `try catch blocks` as follow:

```SQL
CREATE PROCEDURE TransferMoney(@from_id, @to_id, @amount)
BEGIN TRY
  BEGIN TRANSACTION
    UPDATE BalanceAccount SET Balance = Balance - @amount WHERE id = @from_id
    UPDATE BalanceAccount SET Balance = Balance + @amount WHERE id = @to_id
  COMMIT TRANSACTION
END TRY
BEGIN CATCH
  ROLLBACK TRANSACTION
END CATCH
```

or **unwanted result**:

| BalanceAccount |
| id | user | balance
| :--- | :----: | :---: |
| 1 | A | $5,000 |
| 2 | B | $4,000 |

### Consistency

Given that the default data type of balance is `INTEGER`, suppose user A is a hacker and use SQL injection to insert **string** to his account, trying to mess up his balance. With consistency, the value should not be changed as follow:

```SQL
CREATE PROCEDURE UpdateBalance(@user_id, @amount)
BEGIN TRY
  BEGIN TRANSACTION
    UPDATE BalanceAccount SET Balance = @amount WHERE id = @from_id
  COMMIT TRANSACTION -- here the database perfroms a bunch of callbacks, which the wrong datatype should be detected
END TRY
BEGIN CATCH
  ROLLBACK TRANSACTION
END CATCH
```

or **unwanted result**:

| BalanceAccount |
| id | user | balance
| :--- | :----: | :---: |
| 1 | A | mother fucker |
| 2 | B | $4,000 |

### Isolation

Without isolation, inconsistent results on users. Three issues as follow:

* dirty read: read data from a row that has been modified by another **running** transaction and not yet committed
* non-repeatable read: returns two different result in single transaction because of other updates
* phamton:

#### dirty read

User A transfer $1,000 dollar to user B but input string value, `"$1,000"` rather than `1000`. Then given above mechanism, this transaction will be rollback. Dirty read may occur if database read the value before database finish the `COMMIT`.

```SQL
SELECT balance FROM BalanceAccount WHERE id = 1 -- balance = 5000
-- the updates that going to be rollback
SET TRANSACTION LEVEL READ uncommited -- letting database to read data from uncommited data
SELECT balance FROM BalanceAccount WHERE id = 1 -- balance = 4000 -> wrong
-- rollback occurs
```

The only solution is to read it if database `COMMIT` all related transaction. By default, the reading procedure will **wait** until all `COMMIT`s finish.

or **unwanted result** in one transaction:

```SQL
5000 -- first SELECT
-- commit rollback
4000 -- second SELECT
```

#### non-repeatable read

Again, user A transfer $1,000 dollar to user B and there is a mechanism to sum up the debit and credit values cash flows and compare the value wth balance. Non-repeatable read occurs when some value updates during the transaction as follow: (The transfer commands occur during the following comands)

```SQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ -- set the system to have only repeatable read, so that no non-repeatable read occurs

BEGIN TRANSACTION
SELECT balance FROM BalanceAccount WHERE id = 1 -- balance = 5000
... -- some complex SQL commands costing lots of time to compare value with debit side
SELECT balance FROM BalanceAccount WHERE id = 1 -- balance = 5000 (still!!!!!!!!!!)
... -- some complex SQL commands to compare value with credit side
COMMIT TRANSACTION
```

or **unwanted result** in one transaction:

```SQL
5000 -- first SELECT
-- commit occurs
4000 -- second SELECT
```

#### phamton

Suppose there is a transaction needs the total number of BalanceAccount at the beginning and the end and there is a new user created. The `TRANSACTION` would be as follow:

```SQL
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE -- prevent phamton
BEGIN TRANSACTION
SELECT COUNT(*) FROM BalanceAccount -- return 100
-- some complex calcualtions take time
SELECT COUNT(*) FROM BalanceAccount -- return 100
COMMIT TRANSACTION
```

or **unwanted result**:

```SQL
100 -- first select
-- some complex calcualtions take time
101 -- second select
```

### Durability

Database achieve durability by

* non-volatile storage: can retain stored information even after power is removed
* coordinate before commit: if there concurrent commits, it will coordinate first then commit
* transaction log: recreate the system state with these log

## Reference

[ACID](https://en.wikipedia.org/wiki/ACID)

[Database Transactions (ACID)](https://www.youtube.com/watch?v=AcqtAEzuoj0)

[sql server dirty read example](https://www.youtube.com/watch?v=5ZEchu2WnD4)

[Non repeatable read example in sql server](https://www.youtube.com/watch?v=d5QNpsezNTs)

[Durability (database systems)](https://en.wikipedia.org/wiki/Durability_(database_systems))
