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
npm i express-session
```

### config

add `./configs/config.js` with

```javascript
const User = require('../database/models/user.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

passport.use(new LocalStrategy({
    usernameField : 'email', // override username with email
    passwordField : 'password',
  }, (email, password, done) => {
    User.findOne({
      where: {
        email: email
      }
    }).then(function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {
        let newUser = User.build({ email: email, password: password });
        newUser.save(function(err) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  })
);

module.exports = passport
```

In the code, you can see it will first find whether the user exist; if not, it will create a new user for you.

### APIs (signup, users, login)

```javascript
const passport = require('../configs/passport.js');

module.exports = (app) => {
  // create
  app.post('/signup', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/signup',
  }));

  // read, index (TBC)
  app.get('/users', () => {
    modelUser.findAll().then(res => {
      console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
  })
}
```

### spec

```javascript

```

#### login (TBC)

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

[Node Authentication using passport.js - Part 1](https://dev.to/ganeshmani/node-authentication-using-passport-js-part-1-53k7)
