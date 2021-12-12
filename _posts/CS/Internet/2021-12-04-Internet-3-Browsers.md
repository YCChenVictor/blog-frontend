---
layout: post
title: (Internet 3) Browsers
description: ''
date: '2021-012-04T09:40:50.037Z'
categories: internet
note: 大概知道一下即可
---

## Introduction

This article is mainly about the mechanism behind the browser with examples mainly in chrome.

## Why?

Help me making better decision as backend developer.

## How?

After your device get the response from other machine through HTTP, your device needs a mechanism to render the responsed data, the realization of this mechanism occurs in your browser. The data flow as follow:

1. The responsed data: HTML, PDF, image, ...etc
2. Browsers combined data from UI backend, JavaScript, and Networking (data from backend) and send it to rendering engine
3. The rendering engine parse data and send it to brower engine
4. Browser display data on UI with specifications maintained by W3C

skip

## What?

## Reference

[How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
