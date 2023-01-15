---
layout: post
title:
description: ''
date: '2022-12-31'
categories: node
note:
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

Compare to not using it

Compare to not use passport

## How?

### init

install

```bash
npm i passport
npm i passport-local
```

### config

add `./configs/config.js` with

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        const newUser = new User({ username: username, password: password });
        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  ));
}
```

and import it in `app.js`

```javascript
const passport = require('./config/passport.js');
app.use(passport.initialize())
```

In the code, you can see it will first find whether the user exist; if not, it will create a new user for you.

### sign up

Given we have api

```javascript
module.exports = (app) => {
  app.post('/sign_up', (req, res) => {
    ...
  })
}
```

define method

```javascript
app.post('/sign_up', (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).send('Invalid email address');
  }
  if (password.length < 8) {
    return res.status(400).send('Password must be at least 8 characters');
  }

  User.create({ email, password })
    .then(() => res.send('Account created successfully'))
    .catch(err => res.status(500).send('Error creating account'));
});
```

* you can extract the sign up login as `sign_up.js`

### login

define routes

```javascript
module.exports = function(app) {
  ...
  app.post('/login', (req, res) => {
    const info = req.body;
    product.id = new Date().getTime();
    data.push(product);
    // 傳響應告訴前端已新增成功
    res.send({ success: true, data }).end();
    // console.log 看一下 data, 確認是否新增成功
    console.log(data);
  })
  ...
}
```

Create `login.js` with

```javascript
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
```

and

```javascript
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
```

## What?

TBC

## Reference
