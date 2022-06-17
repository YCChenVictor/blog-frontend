---
layout: post
title: prototype
description: ''
date: '2022-03-22'
categories: design-pattern presentation
note: 文章要強調這個 pattern 可以減少很多 IO，因為這是要 present 的，我看還是用 ruby 好了
mathjax:
mermaid: true
publish:
---

## Introduction

For example, a worker created a document for weeks with following steps:

1. research on the internet for key informations (map to public method)
2. request private data from the company's database (map to private method)
3. organized all knowledge above and build storyline (map to calculation method)
4. compose presentation based on the storyline (map to transform method)
5. some tedious tasks before and after this work; for example, clean up the desk ...etc (map to some unrelated environment settings waiting)

 has many yyy and now wants to create a new zzz, which is a little different from yyy, then xxx may just copy the design of yyy so that xxx does not need to re-design it and make some changes **during** the creation with steps: (replace them after the coding completes)

Prototype design pattern serves as the same concepts of this process; for **creating** new object by **copying** other object through adding any subclass of a super class **at run time**.

## Why?

* If we know there are numerous classes we need at the runtime but we try not to create these subclasses in advance.

* we know new a new objects takes time, so we use clone method and define the all the run time process in clone and only modify the different places. (這邊要去看 clone 那個 process)

## How?

## What?

```ruby

```

and create instance from these four classes

```ruby

```

I think I should count the processing time of new vs clone

## Reference

[Prototype Design Pattern Tutorial](https://www.youtube.com/watch?v=AFbZhRL0Uz8)
[[Design Pattern] Prototype 原型模式](https://ithelp.ithome.com.tw/articles/10221129)
[Prototype](https://refactoring.guru/design-patterns/prototype)
