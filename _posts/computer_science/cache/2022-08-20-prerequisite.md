---
layout: post
title:
description: ''
date: '2022-08-20'
categories: cache
note: 一樣，what 的部分應該要實際寫案例
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

To perform business logics on webpage, application needs JS, CSS, HTML, query results and we can reduce the processing time by placing the unchanged results in cache:

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
