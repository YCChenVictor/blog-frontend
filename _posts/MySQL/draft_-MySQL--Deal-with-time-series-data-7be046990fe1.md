---
title: (MySQL) Deal with time series data
description: 'reference: Medium'
date: ''
categories: []
keywords: []
slug: ''
---

### The problem

RDBMS seems not suitable for time series data because of the scaling problem. The amount of time series data increase with the time, so the scale increases dramatically, where scale is the weak part of RDBMS. As a result, around 68% users use NoSQL instead. Can I still use MySQL?

### Problem statement: how to solve the scale problem in MySQL

#### There are two approach: scaling up and scaling out

**scaling up**

Let more time series data to be stored in one machine

**scaling out**

Let more machine to store time series data

### scaling up

#### The data processing in DB:

Save data -> Save data into memory -> too much data -> Save data into disk -> command process to disk -> retrieve data from disk and save it into memory -> retrieve data from memory

#### Difficulties: 

**memory is much more expensive**

**Saving into and retrieving from disk takes too much time compare to memory**

Given the two difficulties above, scaling up methods with more memory or more time to process won’t be desired; as a result, coming up with a cheaper and time saving scaling up method is what the problem trying to solve.

### Cheaper and Time-saving scaling up method

Given the restrictions, the only way to solve the problem would be modification to the data structure, which slices the data into many chunks.

#### Approach of Chunking #1: Fixed-duration intervals

Slice the data once a fixed time period. Draw back: the data naturally getting larger as the time pass; as a result, the data stored in each fixed time period increases, which still cause too much data to read problem in the future.

#### Approach of Chunking #2: Fixed-sized chunks

Slice the data once a fixed amount of data. Draw back: there maybe time lag while saving data into database; as a result, there may be larger data chunk because all the data saved at the same time.

#### Approach of Chunking #3: Adaptive intervals

[TimescaleDB](https://www.timescale.com/) solves the issues raised in above two approaches by adding two mechanisms: if the data per time period increases, the frequency of slicing a chunk increase; if the data arrives earlier, the data would be postponed to the future chunk.

### Let’s build one with MySQL

skipped, I just use TimescaleDB