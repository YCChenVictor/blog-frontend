---
layout: post
title:
description: ''
date: '2022-12-31'
categories: node
note: 把 task 的 login 貼過來
mathjax:
mermaid:
p5:
threeJS:
anchor:
publish: true
---

## Introduction

This article describes how to implement it with passport.

## Why?

* middleware for authentication
* multiple authentication strategies
  * Local Authentication (username and password)
  * OAuth (e.g. Facebook, Google)
  * OpenID Connect
* improve the security

## How?

### server

```javascript
...

// parse body
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// session
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// passport
const passport = require('./middleware/passport.js');
app.use(passport.initialize());

...

module.exports = app
```

### API

* signup
* login

```javascript
const passport = require('../middleware/passport.js');
const User = require('../database/models/user.js');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/signup', async (req, res, next) => { // create
    const email = req.body.params.username
    const password = req.body.params.password
    if (!email || !password) {
      return res.status(401).json({ msg: 'Please enter all fields' });
    }

    const user = await User.create({
      email,
      password
    })

    const token = jwt.sign(user.email, 'secret_key');
    res.json({ token: token });
    res.end()
  })

  app.post(
    '/login',
    passport.authenticate('local'),
    (req, res) => {
      res.status(200).send({token: req.user.token});
    }
  );
}
```

### passport middleware

You can think `passport.js` as a middleware to check whether this user can enter the border of our app.

* add `./middleware/passport.js`

```javascript
const User = require('../database/models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const customizedPassport = passport.use(
  new LocalStrategy({ // here can be changed to JWT strategy
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (username, password, done) => {
    user = await User.findOne({
      username,
      password
    })

    if (!user) {
      return done(null, false, { message: 'no user' });
    } else {
      const token = jwt.sign(user.email, 'secret_key');
      return done(null, {token: token});
    }
  })
);

customizedPassport.serializeUser(function(user, done) {
  done(null, user);
});

customizedPassport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = customizedPassport
```

### spec

TBC

```javascript

```

## What?

give a project and use postman to demo

## Reference

[Node Authentication using passport.js - Part 1](https://dev.to/ganeshmani/node-authentication-using-passport-js-part-1-53k7)

[How do you debug Jest Tests?](https://stackoverflow.com/questions/33247602/how-do-you-debug-jest-tests)

[Username & Password](https://www.passportjs.org/concepts/authentication/password/)

[Easy Way to Debug Passport Authentication in Express](https://dmitryrogozhny.com/blog/easy-way-to-debug-passport-authentication-in-express)
