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

Authentication in API is a way to make sure user from client side has authorization from server side; for example, a user input username and password, then they are encrypted on client side, and then posted from client to server side. Server will parse it and check whether they matches the username and password recorded in database.

## Why?

try to answer why we need Authentication

## How?

### Basic Structure

Given we have the [concept of HTTP]({{site.baseurl}}/internet/2021/04/09/hyper-text-transfer-protocol.html), client sent requests to server with key information in headers, including `Authorization` with form such as

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

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.

#### sign up with node and react

* On the client side (React), when a user submits their sign-up form, a request is made to the server to create a new user account. For example, you can use the fetch API to send a POST request to the server with the user's information:

```javascript
handleSubmit = (event) => {
  event.preventDefault();
  const { email, password, name } = this.state;
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('token', data.token); // try to prevent XSS
    this.setState({ isAuthenticated: true });
  })
  .catch(error => console.error(error));
}
```

* On the server side (Node), the user's information is verified and then added to the database. After that, a JWT is generated and sent back to the client in the response. For example, you can use the jsonwebtoken library to generate a JWT:

```javascript
const jwt = require('jsonwebtoken');

app.post('/api/signup', (req, res) => {
  const { email, password, name } = req.body;
  //verify the input and create user
  if (isValid(email, password, name)) {
    createUser(email,password,name)
    const user = { email };
    const token = jwt.sign(user, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid input' });
  }
});
```

It's important to note that you should also hash the password before storing it in the database. This can be done using a library such as bcrypt.

* On the client side, the JWT is stored in local storage or a cookie.
* For subsequent requests to protected routes or resources, the client attaches the JWT to the request header as an "Authorization" field.
* On the server side, the JWT is extracted from the request header and verified. If the JWT is valid, the request is processed, otherwise, the server sends back a 401 Unauthorized response.

#### other API with node and react

* On the client side (React), when a user submits their login credentials, a request is made to the server to authenticate the user.

```javascript
handleSubmit = (event) => {
  event.preventDefault();
  const { email, password } = this.state;
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    this.setState({ isAuthenticated: true });
  })
  .catch(error => console.error(error));
}
```

* On the server side (Node), the login credentials are checked against the database, and if they are valid, a JWT is generated and sent back to the client in the response. For example, you can use the jsonwebtoken library to generate a JWT:

```javascript
const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // check credentials against database
  if (isValid(email, password)) {
    const user = { email };
    const token = jwt.sign(user, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
```

* On the client side, the JWT is stored in local storage or a cookie.
* For subsequent requests to protected routes or resources, the client attaches the JWT to the request header as an "Authorization" field.

```javascript
const token = localStorage.getItem('token');

fetch('/api/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => console.error(error));
```

* On the server side, the JWT is extracted from the request header and verified. If the JWT is valid, the request is processed, otherwise, the server sends back a 401 Unauthorized response.

```javascript
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secret_key', (error, decoded) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
```

## Reference

[開發者必備知識 - HTTP認證（HTTP Authentication）](https://carsonwah.github.io/http-authentication.html)
