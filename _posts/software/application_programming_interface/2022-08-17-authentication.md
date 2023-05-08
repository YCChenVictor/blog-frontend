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

### JSON Web Tokens (JWT)

JWT is a self-contained token that securely transmits information between parties as a JSON object. It consists of three parts: a header, a payload, and a signature.
* Header contains information about the token
* Payload contains the claims (user information, expiration time, etc.)
* Signature ensures the integrity of the token. The server validates the token's signature to verify its authenticity.

The steps of JWT:

1. Claims: JWT consists of a set of claims encoded as a JSON object. These claims can include information about the user, such as the user's name, ID, and roles.
2. Encoding: The JSON object is then Base64Url encoded to produce a compact string, which is the JWT.
3. Signature: To ensure that the information in the JWT has not been tampered with, a signature is generated using a secret key shared between the parties. The signature is calculated over the encoded JWT and is appended to it, separated by a period.
4. Transmission: The JWT is then sent from the client to the server in the **Authorization** header of an HTTP request, usually as a Bearer Token.
5. Verification: On the server, the signature is verified using the shared secret key, and if the signature is valid, the information in the JWT is trusted and can be used to perform authorized actions.

### Basic Authentication

Basic Authentication involves sending the API credentials (username and password) with every request. The credentials are encoded in Base64 and sent in the request headers. However, this method is not considered secure for APIs because the credentials are sent with every request and could be intercepted if the connection is not encrypted.

Given we have the [concept of HTTP]({{site.baseurl}}/internet/2021/04/09/http.html), client sent requests to server with key information in headers, including `Authorization` with form such as

```bash
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

`Basic` means the method of authentication and `QWxhZGRpbjpvcGVuIHNlc2FtZQ==` is encoded on client side and going to be decoded on server side to check authorization.

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

### Token-Based Authentication

Token-based authentication involves exchanging credentials (username and password) for a token from the server. This token is then used to authenticate subsequent requests. Tokens can be stored on the client-side (e.g., local storage or cookies) and sent with each request in the headers. Tokens are typically long, randomly generated strings and can have an expiration time, providing better security.

### other

API Keys:
API keys are simple, unique strings that are used to authenticate requests. The API key is typically included in the request headers or as a query parameter. The server verifies the validity of the key before processing the request. API keys are easy to implement but provide a lower level of security as they can be compromised if not handled properly.

OAuth 2.0:
OAuth 2.0 is a widely adopted industry-standard protocol for authentication and authorization. It allows users to grant limited access to their resources on one website (called the "resource server") to another website or application (called the "client") without sharing their credentials. OAuth 2.0 involves obtaining an access token from the authorization server and using that token to make authenticated requests to the API.

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
