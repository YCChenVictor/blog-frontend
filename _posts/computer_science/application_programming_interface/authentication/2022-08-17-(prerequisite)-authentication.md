---
layout: post
title:
description: ''
date: '2022-08-17'
categories: api
note: 其實 what 的部分應該要真的有實作
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish:
---

## Introduction

Authentication in API is a way to make sure user from client side has authorization from server side; for example, a user input username and password, then they are encrypted on client side, and then posted from client to server side. Server will parse it and check whether they matches the username and password recorded in database.

## Why?

try to answer why we need Authentication

## How?

### Basic Structure

Given we have the concept of HTTP (refer to 2021-04-09-hyper-text-transfer-protocol.md), client sent requests to server with key information in headers, including `Authorization` with form such as

```bash
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

`Basic` means the method of authentication and `QWxhZGRpbjpvcGVuIHNlc2FtZQ==` is encoded on client side and going to be decoded on server side to check authorization.

## What?

As technology improves, from easy to advanced,

### basic

For example, given `username = Aladdin` and `password = open sesame`, the encoding of `Aladdin:open sesame` in Base64 is `YWxpY2U6c3VwZXJtYW4=` and client will send request with authorization in header:

```bash
Authorization: Basic YWxpY2U6c3VwZXJtYW4=
```

Then server will decode it in Base64 and match the `username` and `password` stored in server. If the result did not match, the example response:

```bash
HTTP/1.1 401 Unauthorized
Date: Wed, 21 Oct 2015 07:28:00 GMT
WWW-Authenticate: Basic realm="Access to staging site"
```

* pros
* cons
  * no session expiration mechanism, meaning once login, login in until browser cookie expires.
  * easy algorithm to hack
  * Replay attack (TBC)

### digest

### OAuth

### Bearer

### JWT

## Reference

[開發者必備知識 - HTTP認證（HTTP Authentication）](https://carsonwah.github.io/http-authentication.html)
