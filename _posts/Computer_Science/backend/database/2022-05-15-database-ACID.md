---
layout: post
title: (database) ACID
date: '2022-05-14'
categories: database presentation
note:
mathjax:
mermaid:
p5:
threeJS:
---

## Introduction

ACID is the abbreviation of four words: atomicity, consistency, isolation, durability. With ACID, the database performs transactions reliably.

* atomicity: atomicity ensures one transaction is treated as a single unit
* consistency: consistency ensures transaction can only bring the database from one valid state to another
* isolation: isolation ensures concurrent transactions leaves the database in the same state
* durability: durability ensures the changes from transaction will remain committed even in the case of a system failure

## Why?

If database did not follow this propreties,

* no atomicity: transaction fails -> **without atomicity** -> database changed uncompletely (some SQL command processed and some did not)
* no consistency: transaction did not follow all defined rules -> **without consistency** -> database corrupted, making it to be unstable in the future
* no isolation: multiple transactions reading and writing to a table at the same time -> **without isolation** -> no rules to determine when to share the same state to other users -> inconsistent results
* no durability: some transactions occur -> **without durability** -> transactions disappear after system crash

## How?

### Atomicity

舉個例子

### Consistency

舉個例子

### Isolation

* dirty read
* nonrepeatable read
* phamton

舉個例子

Transactions are often executed concurrently (e.g., multiple transactions reading and writing to a table at the same time). Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. Isolation is the main goal of concurrency control; depending on the method used, the effects of an incomplete transaction might not even be visible to other transactions.[7]

Isolation is typically defined at database level as a property that defines how or when[clarification needed] the changes made by one operation become visible to others.

### Durability

舉個例子

Durability guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure (e.g., power outage or crash). This usually means that completed transactions (or their effects) are recorded in non-volatile memory.

## What?

give an example

## Reference

[ACID](https://en.wikipedia.org/wiki/ACID)
