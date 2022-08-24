---
layout: post
title:
description: ''
date: '2022-08-22'
categories: web-security
note: 來研究 SSL or TLS 如何應用在 HTTPS，可以把 rails 這類的框架怎麼解決的寫在 what section
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

This article describes the related concepts of web security. The top 10 attack methods:

* cross site scripting (XSS): Attacks client side. Attacker injects javascript to a webpage through legal inputs and browsers run it and get sick; for example, keeping alerting a message.
  * refletced: only on client side
  * stored: stored into database and affects all other browsers querying it
  * DOM: TBC
  * mutation: TBC
* injection flaws: Attacks server side. Attacker injects SQL commands to a webpage through legal inputs and server runs it and get sick; for example, remove data stored in database.
  * 
* insecure remote file include
* insecure direct object reference
* ...

## Why?

focus on why we need it

## How?

This section will explain the mechanisms of each attack so that we can have deeper understanding about how to solve it in what section.

### cross site scripting (XSS)

Given general methods of each type

### injection flaws

## What?

give an example

## Note

HTTPS protects users from malware.

HTTPS lets user know which website they're granting access to

HTTP 2 is only available if using HTTPS

HTTPS use encrypt alogrithm to encrypt data transferred

HTTPS can use SSL or TLS to encrypt data

OWASP top 10:

* Cross Site Scripting（XSS）
* Injection Flaws
* Insecure Remote File Include
* Insecure Direct Object Reference
* ...

## Reference

[Real Talk about HTTPS (Chrome Dev Summit 2016)](https://www.youtube.com/watch?v=iP75a1Y9saY)

[SSL, TLS, HTTP, HTTPS Explained](https://www.youtube.com/watch?v=hExRDVZHhig)

[OWASP十大網路應用系統安全弱點說明](https://www.gss.com.tw/eis/59-eis48/290-owasp-top10)

[Cross-Site Scripting (XSS) Explained](https://www.youtube.com/watch?v=EoaDgUgS6QA)

[2017 OWASP Top 10: Injection Attacks](https://www.youtube.com/watch?v=rWHvp7rUka8)
