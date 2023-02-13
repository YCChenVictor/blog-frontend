---
layout: post
title:
description: ''
date: '2022-08-17'
categories: API
note: 其實 what 的部分應該要真的有實作
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

Authentication in API is a way to make sure user from client side has authorization from server side.

## Why?

With authentication, only authorized users are able to access sensitive information or perform actions that could affect the system or its users.

## How?

### Structure

Given we have the [concept of HTTP]({{site.baseurl}}/internet/2021/04/09/http.html), client sent requests to server with key information in headers, including `Authorization` with form such as

```bash
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

`Basic` means the method of authentication and `QWxhZGRpbjpvcGVuIHNlc2FtZQ==` is encoded on client side and going to be decoded on server side to check authorization.

### Basic

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

to be continued

### OAuth

to be continued

### Bearer

to be continued

### JWT

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. JWT is often used to authenticate users and pass information about them between systems, especially in stateless systems like single-page applications and RESTful APIs.

The steps of JWT:

1. Claims: JWT consists of a set of claims encoded as a JSON object. These claims can include information about the user, such as the user's name, ID, and roles.
2. Encoding: The JSON object is then Base64Url encoded to produce a compact string, which is the JWT.
3. Signature: To ensure that the information in the JWT has not been tampered with, a signature is generated using a secret key shared between the parties. The signature is calculated over the encoded JWT and is appended to it, separated by a period.
4. Transmission: The JWT is then sent from the client to the server in the **Authorization** header of an HTTP request, usually as a Bearer Token.
5. Verification: On the server, the signature is verified using the shared secret key, and if the signature is valid, the information in the JWT is trusted and can be used to perform authorized actions.

In conclusion, JWT is a secure and efficient way of transmitting information between parties. The compact format and digital signature of JWT make it an ideal choice for authentication and authorization in modern web applications.

## What?

### JWT in JS

```javascript
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

// Generate a JWT
const token = jwt.sign({ id: 123, name: 'John Doe' }, SECRET_KEY, {
  expiresIn: '1h'
});

// Verify a JWT
const decoded = jwt.verify(token, SECRET_KEY);
console.log(decoded); // { id: 123, name: 'John Doe', iat: 1547451138, exp: 1547454738 }
```

* we can generate SECRET_KEY with `crypto`

```javascript
const crypto = require('crypto')
const key = crypto.randomBytes(32).toString('hex') // secret key
```

## Reference

[開發者必備知識 - HTTP認證（HTTP Authentication）](https://carsonwah.github.io/http-authentication.html)
