---
title: (DBMS_3) Relational Algebra in Database
description: Introductio
date: '2021-03-17T07:54:46.016Z'
categories: []
keywords: []
slug: /@t5204713910/dbms-3-relational-algebra-in-database-2a8adcbfe42b
---

### Introduction

A theory using algebraic structure with well-founded semantics for data modeling. Then define the data queries on this theory.

### Why?

With relational algebra, we can define the query function completely. We need a systematic way for query language designing.

### The examples:

categories: unary relational, binary relational, relational algebra from set theory

#### Unary Relational (SELECT, PROJECT, RENAME)

The unary relational methods suit for **A** table; for example, selecting data from a table, selecting columns from a table, rename data in a table

**SELECT (symbol: σ)**

SELECT is used for selecting tuple from a table. The formula:

σ\_t^(T)

σ topic = "Database" (Tutorials)

means “SELECT tuples from Tutorials where topic = ‘Database’.”

**PROJECT (symbol: π)**

PROJECT is used for defining a relation that contains a vertical **subset** of Relation. The formula:

Π\_t1,t2^(T)

Π CustomerName, Status (Customers)

means “SELECT the columns FROM Customers WHERE column\_name = CustomerName, Status”

**RENAME (symbol: ρ)**

ρ (a/b)R

means “rename attribute b of relation by a”

#### Relational Algebra from Set Theory (UNION, INTERSECTION, DIFFERENCE, CARTESIAN PRODUCT)

**UNION (υ)**

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__n7MDZgQbFzOy3GpkT4Nqfg.png)

A υ B means

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__2V4rsTtckQPSLHuMCKJMig.png)

**INTERSECTION**

A ∩ B means

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Nz3RuX1h7Pd2rU4naGFcKw.png)

**DIFFERENCE**

A — B means

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__9baB1y__0Haqm33FieJuyRQ.png)

**CARTESIAN PRODUCT**

for example,

A = (x, y, z); B = (1, 2, 3), then A X B =

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ZFU47Skd1nOI2Zp2Hy3YGw.png)

for example,

σ\_(column 2 = '1')(A X B)

means in A X B where there is 1 in column 2; as a result, the result should be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__cHWfh7Qcy765CRhhRxTe2w.png)

#### Binary Relational (Inner Join & Otter Join)

**Inner Join (Theta, EQUI, Natural)**

1.  Theta Join: the general case of JOIN operation

A ⋈θ B

for example,

A ⋈\_(A.column 2 >  B.column 2)(B)

means find tuples from A where the value in column 2 of A is bigger than the value in column 2 of B.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__uz5XWoYAQmEZXy1CWCTjtA.png)

2\. EQUI Join: when theta join use equal sign

A ⋈\_(A.column 2 =  B.column 2)(B)

meaning find the tuples from A where the value in column 2 of A = the value in column 2 of B.

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__R__xEPO7HpukrcUJOH6ihdw.png)

3\. Natural Join: SELECT all the tuples where both table have same attribute; for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__zO5NTcl9igOHbeNVva__gUg.png)

**Otter Join (Left, Right, Full)**

otter join returns not only the intersection of both table, but also the other.

1.  Left Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__Pmx__LY1VFf__id6eym38MiQ.png)

for example,

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__iAePBfyy9k88lTBU3SbymA.png)

Then left join will be

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__ljglGmgIkK__Kqw4jCjbxPA.png)

2\. Right Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__oScxW0M4fNNm3Wm2UDFwTg.png)

3\. Full Join

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__V____gnF8tut4nOTVu1fgWAg.png)

### reference

[https://www.guru99.com/relational-algebra-dbms.html](https://www.guru99.com/relational-algebra-dbms.html)

[**Relational algebra**  
_In database theory, relational algebra is a theory that uses algebraic structures with a well-founded semantics for…_en.wikipedia.org](https://en.wikipedia.org/wiki/Relational_algebra "https://en.wikipedia.org/wiki/Relational_algebra")[](https://en.wikipedia.org/wiki/Relational_algebra)

[**SQL INNER JOIN - w3resource**  
_The INNER JOIN selects all rows from both participating tables as long as there is a match between the columns. An SQL…_www.w3resource.com](https://www.w3resource.com/sql/joins/perform-an-inner-join.php "https://www.w3resource.com/sql/joins/perform-an-inner-join.php")[](https://www.w3resource.com/sql/joins/perform-an-inner-join.php)