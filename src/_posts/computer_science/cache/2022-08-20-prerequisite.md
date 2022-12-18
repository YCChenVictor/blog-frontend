---
layout: post
title:
description: ''
date: '2022-08-20'
categories: cache
note: 一樣，what 的部分應該要實際寫案例，沒有 cache 的圖很重要，之後再用 subgraph 把 client 跟 server side 個包起來，從 TBC 再繼續
mathjax:
mermaid: true
p5:
threeJS:
anchor:
publish:
---

## Introduction

Given there is no cache, requests from users:

<div class="mermaid">
graph LR
  id1(user 1) --#1--> id2(browser 1)
  id1(user 1) --#2--> id2(browser 1)

  id3(user 2) --#3--> id4(browser 2)
  id3(user 2) --#4--> id4(browser 2)

  id2(browser 1) --request from #1--> id5(data processing)
  id2(browser 1) --request from #2--> id5(data processing)
  id4(browser 2) --request from #3--> id5(data processing)
  id4(browser 2) --request from #4--> id5(data processing)

  id5(data processing) --query from #1--> id6(database)
  id5(data processing) --query from #2--> id6(database)
  id5(data processing) --query from #3--> id6(database)
  id5(data processing) --query from #4--> id6(database)
</div>

* denote # as the order of the usages from users

As you can image, given that webpage remains the same, on the server side, we actually can put a server to cache the request results between browsers and the layer of data processing, so that the #2~#4 requests can directly use it without asking them as follow:

<div class="mermaid">
graph LR
  id1(user 1) --#1--> id2(browser 1)
  id1(user 1) --#2--> id2(browser 1)

  id3(user 2) --#3--> id4(browser 2)
  id3(user 2) --#4--> id4(browser 2)

  id2(browser 1) --request<br>from #1--> id7(server<br>side<br>cache)
  id2(browser 1) --request<br>from #2--> id7(server<br>side<br>cache)
  id4(browser 2) --request<br>from #3--> id7(server<br>side<br>cache)
  id4(browser 2) --request<br>from #4--> id7(server<br>side<br>cache)

  id7(server<br>side<br>cache) --request<br>from #1--> id5(data<br>processing)
  id5(data<br>processing) --store<br>results--> id7(server<br>side<br>cache)

  id5(data processing) --query from #1--> id6(database)
</div>

(TBC)

To perform business logics on webpage, application needs JS, CSS, HTML, query results. We can reduce the processing time by placing the unchanged results in cache:

* client: cache JS, CSS, HTML in browsers
* server: cache query results in database
* network: cache both client and server contents in closer host (CDN)

## Why?

We want App to perform what users want as quick as possible -> avoid processes -> cache

## How?

### client

We know an image file will remain the same for a given time, then when a user request comes, in the response header, put 

If we do not know when the file changes, we need at least an identification to match the file in browser and the one stored on server for whether caching again. Then

### server

### network

## What?

give examples

## Reference

[沒了解過 Cache，就別說網站性能沒救了！](https://oldmo860617.medium.com/%E6%B2%92%E4%BA%86%E8%A7%A3%E9%81%8E-cache-%E5%B0%B1%E5%88%A5%E8%AA%AA%E7%B6%B2%E7%AB%99%E6%80%A7%E8%83%BD%E6%B2%92%E6%95%91%E4%BA%86-6d9d4cfe3291)

[Server-Side Caching vs. Client-Side Caching: The Differences (And Which Is Good For Your Website)](https://edgemesh.com/blog/difference-between-server-side-caching-and-client-side-caching-and-which-is-good-for-your-website)
